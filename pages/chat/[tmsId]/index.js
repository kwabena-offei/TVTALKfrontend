'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { ChatHeader, ChatContent } from "../../../components/Chat";
import { isAuthenticated } from '../../../services/isAuth'
import { AuthContext } from '../../../util/AuthContext'
import useSocket from '../../../hooks/useSocket';
import useAxios from '../../../services/api';
// import axios from 'axios';

export async function getServerSideProps(context) {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const { tmsId } = context.query;
  const { axios } = useAxios();

  if (!tmsId) {
    return {
      notFound: true
    };
  }

  const showResponse = await axios.get(`https://api.tvtalk.app/shows/${tmsId}`);
  const { data: show } = await axios.get(`https://api.tvtalk.app/shows/${tmsId}`);
  const { data: comments } = await axios.get(
    `https://api.tvtalk.app/comments?tms_id=${tmsId}`
  );
  // -- If User is not authorized profile data will return null and isAuth will be false --
  const isAuth = isAuthenticated(context)
  let profile = {}
  try {
    let profileResponse = await axios.get('/profile');
    profile = profileResponse.data;
  } catch (error) {
  }

  const heroImageUrl = `https://api.tvtalk.app/data/v1.1/programs/${tmsId}/images?imageAspectTV=16x9&imageSize=Ms&imageText=false`;

  const heroImageResponse = await fetch(heroImageUrl);
  const heroImages = await heroImageResponse.json();
  let heroImage = heroImages.find(({ category }) => category === 'Iconic') || heroImages[0];
  heroImage = `https://${heroImage.uri}`;

  return {
    props: {
      show,
      comments,
      profile,
      isAuth,
      heroImage
    }, // will be passed to the page component as props
  };
}

const Chat = ({ show, comments: serverComments, profile, isAuth, heroImage }) => {
  const { tmsId } = show;
  const [comments, setComments] = useState(serverComments)

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
      <AuthContext.Provider value={isAuth}>
        <ChatContent show={show} comments={comments.results} profile={profile} />
      </AuthContext.Provider>
    </>
  );
};

export default Chat;