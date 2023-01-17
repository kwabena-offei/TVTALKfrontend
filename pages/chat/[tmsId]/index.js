import React from "react";
import useAxios from "../../../services/api";
import axios from "axios";
import { TV_TALK_API } from "../../../util/constants";
import { ChatHeader, ChatContent } from "../../../components/Chat";
import { isAuthenticated } from '../../../services/isAuth'
import { AuthContext } from '../../../util/AuthContext'

export async function getServerSideProps(context) {
  const { tmsId } = context.query;
  console.log('tmsId', tmsId)
  const { axios: myAxios } = useAxios(context)
  const { data: show } = await axios.get(`${TV_TALK_API}/shows/${tmsId}`);
  const { data: comments } = await axios.get(
    `${TV_TALK_API}/comments?tms_id=${tmsId}`
  );
  // -- If User is not authorized profile data will return null and isAuth will be false --
  const isAuth = isAuthenticated(context)
  const { data: profile } = isAuth ? await myAxios.get('/profile') : { data: null }

  return {
    props: {
      show,
      comments,
      profile,
      isAuth
    }, // will be passed to the page component as props
  };
}

const chat = ({ show, comments, profile, isAuth }) => {
  console.log('comments', comments)
  return (
    <>
      <ChatHeader show={show} />
      <AuthContext.Provider value={isAuth}>
        <ChatContent show={show} comments={comments.results} profile={profile} />
      </AuthContext.Provider>
    </>
  );
};

export default chat;
