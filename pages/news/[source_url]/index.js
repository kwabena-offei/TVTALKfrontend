import {
  useTheme,
  useMediaQuery,
  Typography,
  Container
} from "@mui/material";
import React from "react";
// import axios from "axios";
// import useAxios from '../services/api';

export async function getServerSideProps(context) {
  const { source_url } = context.query
  // const { axios } = useAxios(context)
  console.log('[source_url]', source_url)
  return {
    props: {
      url: source_url
    }, // will be passed to the page component as props
  };
}

export default function Page ({ url }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // console.log(news);
  return (
    <>
      <Container>
        <Typography>Header</Typography>
      </Container>
    </>
  );
};

