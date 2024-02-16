"use client";

import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { ChatHeader, ChatContent } from "../../../components/Chat";
import { isAuthenticated } from "../../../services/isAuth";
import { AuthContext } from "../../../util/AuthContext";
import useSocket from "../../../hooks/useSocket";
import useAxios from "../../../services/api";

export async function getStaticProps({ params }) {
  const { tmsId } = params;
  const { axios } = useAxios();

  if (!tmsId) {
    return {
      notFound: true,
    };
  }

  const { data: show } = await axios.get(
    `https://api.tvtalk.app/shows/${tmsId}`
  );
  const { data: comments } = await axios.get(
    `https://api.tvtalk.app/comments?tms_id=${tmsId}`
  );

  let heroImage = `https://${show.preferred_image_uri}`;
  try {
    const heroImageUrl = `https://api.tvtalk.app/data/v1.1/programs/${tmsId}/images?imageAspectTV=16x9&imageSize=Ms&imageText=false`;
    const heroImageResponse = await fetch(heroImageUrl);
    const heroImages = await heroImageResponse.json();
    heroImage =
      heroImages.find(({ category }) => category === "Iconic") || heroImages[0];
    heroImage = `https://${heroImage.uri}`;
  } catch (error) {
    console.log(`Error fetching hero image`, error);
  }

  return {
    props: {
      show,
      comments,
      heroImage: heroImage || "",
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const categoryResponse = await fetch("https://api.tvtalk.app/categories");
  const json = await categoryResponse.json();
  const paths = [];
  json.map((category) => {
    category.shows.map((show) => {
      paths.push({
        params: {
          tmsId: show.tmsId,
        },
      });
    });
  });

  return {
    paths: paths,
    fallback: true,
  };
}

const Chat = ({ show, comments: serverComments, heroImage }) => {
  if (!show) {
    return <></>;
  }

  const { axios } = useAxios();
  const { tmsId } = show;
  const [comments, setComments] = useState(serverComments);
  const [filteredComments, setFilteredComments] = useState(comments.results);
  const [sortedComments, setSortedComments] = useState(filteredComments);
  const [profile, setProfile] = useState({});
  const { isAuthenticated } = useContext(AuthContext);
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let profileResponse = await axios.get("/profile");
        setProfile(profileResponse.data);
      } catch (error) {}
    };

    fetchProfile();
  }, [tmsId]);

  let sorter = () => {};

  if (sortValue === "recent") {
    sorter = (a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();

      if (dateA > dateB) return 1;
      if (dateB < dateA) return -1;

      return 0;
    };
  } else if (sortValue === "popularity") {
    sorter = (a, b) => {
      const popularityScoreA =
        a.likes_count + a.shares_count + a.sub_comments_count;
      const popularityScoreB =
        b.likes_count + b.shares_count + b.sub_comments_count;
      if (popularityScoreA > popularityScoreB) return 1;
      if (popularityScoreB < popularityScoreA) return -1;

      return 0;
    };
  }

  const handleEpisodeChange = async (selectedTmsId) => {
    if (selectedTmsId.tag === "total") {
      const totalPromises = selectedTmsId.content.map(async (episodeId) => {
        return axios.get(`/comments?tmsId=${episodeId}`);
      });
      Promise.allSettled(totalPromises).then((results) => {
        const totalData = [];
        results.forEach((result) => {
          result.value.data.results.forEach((individualResult) =>
            totalData.push(individualResult)
          );
        });
        setFilteredComments(totalData.sort(sorter));
      });
    } else {
      const resp = await axios.get(`/comments?tmsId=${selectedTmsId}`);
      setFilteredComments(resp.data.results.sort(sorter));
    }
  };

  const onSortChange = (value) => {
    setSortValue(value);
  };

  const socket = useSocket(
    "comments",
    "CommentsChannel",
    { tms_id: tmsId },
    (response) => {
      if (response.message?.type === "comment") {
        setComments((prevState) => {
          return {
            ...prevState,
            results: [...prevState.results, response.message],
          };
        });
      }
    }
  );

  return (
    <>
      <ChatHeader show={show} heroImage={heroImage} />
      <AuthContext.Provider value={isAuthenticated}>
        <ChatContent
          show={show}
          comments={filteredComments}
          profile={profile}
          onEpisodeSelect={handleEpisodeChange}
          onSortChange={onSortChange}
        />
      </AuthContext.Provider>
    </>
  );
};

export default Chat;
