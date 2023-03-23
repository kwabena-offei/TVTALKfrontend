'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { ChatHeader, ChatContent } from "../../../components/Chat";
import { isAuthenticated } from '../../../services/isAuth'
import { AuthContext } from '../../../util/AuthContext'
import useSocket from '../../../hooks/useSocket';
import useAxios from '../../../services/api';

export async function getServerSideProps(context) {
  // res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=59'
  // )
  const { tmsId } = context.query;
  const { axios } = useAxios(context)
  const { data: show } = await axios.get(`/shows/${tmsId}`);
  const { data: comments } = await axios.get(
    `/comments?tms_id=${tmsId}`
  );
  // -- If User is not authorized profile data will return null and isAuth will be false --
  const isAuth = isAuthenticated(context)
  const { data: profile } = isAuth ? await axios.get('/profile') : { data: null }

  return {
    props: {
      show,
      comments,
      profile,
      isAuth
    }, // will be passed to the page component as props
  };
}

const Chat = ({ show, comments: serverComments, profile, isAuth }) => {
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
      <ChatHeader show={show} />
      <AuthContext.Provider value={isAuth}>
        <ChatContent show={show} comments={comments.results} profile={profile} />
      </AuthContext.Provider>
    </>
  );
};

export default Chat;