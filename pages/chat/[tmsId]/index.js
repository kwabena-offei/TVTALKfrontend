import React from "react";
import useAxios from "../../../services/api";
import axios from "axios";
import { TV_TALK_API } from "../../../util/constants";
import { ChatHeader, ChatContent } from "../../../components/Chat";

export async function getServerSideProps(context) {
  const { tmsId } = context.query;
  const { axios: myAxios } = useAxios(context)
  const { data: show } = await axios.get(`${TV_TALK_API}/shows/${tmsId}`);
  const { data: comments } = await axios.get(
    `${TV_TALK_API}/comments?tms_id=${tmsId}`
  );
  const { data: profile } = await myAxios.get('/profile')

  // ToDo: create logic with unauthorized user for profile props

  return {
    props: {
      show,
      comments,
      profile
    }, // will be passed to the page component as props
  };
}

const chat = ({ show, comments, profile }) => {
  return (
    <>
      <ChatHeader show={show} />
      <ChatContent show={show} comments={comments.results} profile={profile} />
    </>
  );
};

export default chat;
