import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { ChatHeader, ChatContent } from "../../../components/Chat";
import { isAuthenticated } from "../../../services/isAuth";
import { AuthContext } from "../../../util/AuthContext";
import useSocket from "../../../hooks/useSocket";
import useAxios from "../../../services/api";
import uniqBy from "lodash/uniqBy";
import { buildAPIUrl } from "../../../services/api";

export async function getServerSideProps(context) {
  const { tmsId } = context.params;
  const { axios } = useAxios(context);

  if (!tmsId) {
    return { notFound: true };
  }

  try {
    const { data: show } = await axios.get(`/shows/${tmsId}`);
    const { data: comments } = await axios.get(`/comments?tms_id=${tmsId}`);

    // REMOVED: The slow second API call that was causing 10-30 second delays
    // We'll handle series metadata lazily in the component instead

    let heroImage = `https://${show.preferred_image_uri}`;
    try {
      const heroImageUrl = buildAPIUrl(`/data/v1.1/programs/${tmsId}/images?imageAspectTV=16x9&imageSize=Ms&imageText=false`);
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
      },
    };
  } catch (error) {
    console.error('Error fetching chat data:', error);
    return { notFound: true };
  }
}


const Chat = ({ show, comments: serverComments, heroImage }) => {
  if (!show) {
    return <></>;
  }

  const router = useRouter();
  // get query params
  const { reactionId } = router.query;

  const { axios } = useAxios();
  const { tmsId } = show;
  const [comments, setComments] = useState(serverComments);
  const [filteredComments, setFilteredComments] = useState(comments.results);
  const [profile, setProfile] = useState({});
  const { isAuthenticated } = useContext(AuthContext);
  const [sortValue, setSortValue] = useState("");

  // NEW: track which episode to post to
  const isRouteEpisode = tmsId?.startsWith('EP');
  const [selectedEpisodeTmsId, setSelectedEpisodeTmsId] = useState(isRouteEpisode ? tmsId : null);

  // Initialize filteredComments only on mount, not whenever comments changes
  useEffect(() => {
    setFilteredComments(serverComments.results);
  }, [serverComments]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let profileResponse = await axios.get("/profile");
        setProfile(profileResponse.data);
      } catch (error) {}
    };

    fetchProfile();
  }, [tmsId]);

  useEffect(() => {
    if (reactionId) {
      const fetchReaction = async () => {
        try {
          let reactionResponse = await axios.get(`/comments/${reactionId}`);
          setComments({ results: [reactionResponse.data] });
          setFilteredComments(
            uniqBy([...filteredComments, reactionResponse.data], "id")
          );
        } catch (error) {}
      };

      fetchReaction();
    }
  }, [reactionId]);

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
        return axios.get(`/comments?tms_id=${episodeId}`);
      });
      Promise.allSettled(totalPromises).then((results) => {
        const totalData = results.flatMap(r => (r.value?.data?.results ?? []));
        const base = totalData.sort(sorter);
        setFilteredComments(uniqBy(base, 'id'));
      });
      // Do NOT change post target for "Select All"
    } else {
      const resp = await axios.get(`/comments?tms_id=${selectedTmsId}`);

      const list = Array.isArray(resp.data?.results) ? resp.data.results : [];
      const base = list.sort(sorter);
      setFilteredComments(uniqBy(base, 'id'));

      // Update post target to selected episode
      if (typeof selectedTmsId === 'string' && selectedTmsId.startsWith('EP')) {
        setSelectedEpisodeTmsId(selectedTmsId);
      }
    }
  };


  const onSortChange = (value) => {
    setSortValue(value);
  };

  // Use the selected episode for websocket subscription, fallback to route tmsId
  const activeChannelTmsId = selectedEpisodeTmsId || tmsId;

  const socket = useSocket(
    "comments",
    "CommentsChannel",
    { tms_id: activeChannelTmsId },
    (response) => {
      if (response.message?.type === "comment") {
        // Add the new comment directly to filteredComments (not to comments state)
        // This ensures it only shows up when viewing the episode it was posted to
        setFilteredComments((prevFiltered) => {
          // Check if comment already exists to avoid duplicates
          const exists = prevFiltered.some(c => c.id === response.message.id);
          if (exists) {
            return prevFiltered;
          }
          return [...prevFiltered, response.message];
        });
      }
    }
  );

  return (
    <>
      <ChatHeader show={show} heroImage={heroImage} />
      <ChatContent
        show={show}
        comments={filteredComments}
        profile={profile}
        selectedEpisodeTmsId={selectedEpisodeTmsId}
        onEpisodeSelect={handleEpisodeChange}
        onSortChange={onSortChange}
      />
    </>
  );
};

export default Chat;
