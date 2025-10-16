import Masonry from "@mui/lab/Masonry";
import React from "react";
import { UserLayout, fetchAccount } from "../../../components/UserLayout";
import ReactionCard from "../../../components/ReactionCard";
import useAxios from "../../../services/api";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Page({ reactions, profile }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const { results: reactionsList, pagination } = reactions;

  return (
    <Masonry
      columns={isMd ? 1 : 2}
      spacing={isMobile ? 2.5 : 3.5}
      defaultColumns={1}
      defaultSpacing={2.5}
      sx={{ margin: 0 }}
    >
      {reactionsList?.map((result) => (
        <ReactionCard key={result.id} {...result} profile={profile} />
      ))}
    </Masonry>
  );
}

export async function getServerSideProps(context) {
  const { axios } = useAxios(context);
  const { username } = context.query;

  const { data: reactions } = await axios.get(`/users/${username}/reactions`);
  const profile = await fetchAccount(username, axios);

  return {
    props: {
      reactions,
      profile,
    },
  };
}

Page.getLayout = function getLayout(page) {
  return <UserLayout mode="currentUser">{page}</UserLayout>;
};
