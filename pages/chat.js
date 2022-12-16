import React from "react";
import { Container, Box, Typography, Grid, Stack } from "@mui/material";
// import useAxios from "../services/api";
import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { TV_TALK_API } from "../util/constants";
import { ChatHeader, ChatContent } from "../components/Chat";

export async function getServerSideProps(context) {
  const { tmsId } = context.query;
  const { data: show } = await axios.get(`${TV_TALK_API}/shows/${tmsId}`);
  const { data: comments } = await axios.get(
    `${TV_TALK_API}/comments?tms_id=${tmsId}`
  );
  return {
    props: {
      show,
      comments,
    }, // will be passed to the page component as props
  };
}

// https://api.tvtalk.app/shows/{tmsID}
// preferred_image_uri
const chat = ({ show, comments }) => {
  // console.log('comments', comments)
  // console.log("show", show);
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <ChatHeader show={show} />
      <ChatContent show={show} comments={comments}>

      </ChatContent>
    </>
  );
};

export default chat;
