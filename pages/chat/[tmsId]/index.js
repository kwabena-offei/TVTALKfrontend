'use client';

import React, { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/router';
import { ChatHeader, ChatContent } from "../../../components/Chat";
import { isAuthenticated } from '../../../services/isAuth'
import { AuthContext } from '../../../util/AuthContext'
import useSocket from '../../../hooks/useSocket';
import useAxios from '../../../services/api';
// import axios from 'axios';

export async function getStaticProps({ params }) {
  const { tmsId } = params;
  const { axios } = useAxios();

  if (!tmsId) {
    return {
      notFound: true
    };
  }

  const { data: show } = await axios.get(`https://api.tvtalk.app/shows/${tmsId}`);
  const { data: comments } = await axios.get(
    `https://api.tvtalk.app/comments?tms_id=${tmsId}`
  );


  let heroImage = `https://${show.preferred_image_uri}`;
  try {
    const heroImageUrl = `https://api.tvtalk.app/data/v1.1/programs/${tmsId}/images?imageAspectTV=16x9&imageSize=Ms&imageText=false`;
    const heroImageResponse = await fetch(heroImageUrl);
    const heroImages = await heroImageResponse.json();
    heroImage = heroImages.find(({ category }) => category === 'Iconic') || heroImages[0];
    heroImage = `https://${heroImage.uri}`;
  } catch (error) {
    console.log(`Error fetching hero image`, error)
  }

  return {
    props: {
      show,
      comments,
      heroImage: heroImage || ''
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const categoryResponse = await fetch('https://api.tvtalk.app/categories')
  const json = await categoryResponse.json()
  const paths = []
  json.map((category) => {
    category.shows.map((show) => {
      paths.push({
        params: {
          tmsId: show.tmsId
        }
      })
    })
  })

  return {
    paths: paths,
    fallback: true
  };
}

const Chat = ({ show, comments: serverComments, heroImage }) => {
  if (!show) {
    return <></>;
  }
  const { tmsId } = show;
  const [comments, setComments] = useState(serverComments);
  const [profile, setProfile] = useState({});
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let profileResponse = await axios.get('/profile');
        setProfile(profileResponse.data);
      } catch (error) {
      }
    }

    fetchProfile();
  }, [tmsId]);


  const socket = useSocket(
    'comments',
    'CommentsChannel',
    { tms_id: tmsId },
    (response) => {
      if (response.message?.type === 'comment') {
        setComments((prevState) => {
          return {
            ...prevState,
            results: [...prevState.results, response.message]
          };
        })
      }
    });

  return (
    <>
      <ChatHeader show={show} heroImage={heroImage} />
      <AuthContext.Provider value={isAuthenticated}>
        <ChatContent show={show} comments={comments.results} profile={profile} />
      </AuthContext.Provider>
    </>
  );
};

export default Chat;