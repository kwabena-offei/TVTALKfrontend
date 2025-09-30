import { Grid } from "@mui/material";
import React, { useContext } from "react";
import { UserLayout, fetchAccount } from "../../../components/UserLayout";
import FollowerCard from "../../../components/FollowerCard/FollowerCard";
import FollowerCardMobile from "../../../components/FollowerCard/FollowerCardMobile";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useAxios from "../../../services/api";
import { useRouter } from "next/router";
import { AuthContext } from "../../../util/AuthContext";

export default function Page({ followers, profile }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { profile: currentUser } = useContext(AuthContext);

  const { results: followersList, pagination } = followers;
  
  // Check if we're viewing our own profile
  const isOwnProfile = currentUser?.id === profile?.id;
  
  // Callback to refresh server-side props after follow/unfollow
  const handleFollowChange = () => {
    // Force Next.js to refetch getServerSideProps
    router.replace(router.asPath);
  };

  return (
    <Grid container spacing={isMobile ? 2 : 3.75}>
      {followersList?.map((follower) => {
        return (
          <Grid
            key={`card-followers-${follower.id}`}
            item
            xs={12}
            md={3}
            lg={2}
          >
            {isMobile ? (
              <FollowerCardMobile 
                {...follower} 
                context="followers"
                isOwnProfile={isOwnProfile}
                onFollowChange={handleFollowChange}
              />
            ) : (
              <FollowerCard 
                {...follower} 
                context="followers"
                isOwnProfile={isOwnProfile}
                onFollowChange={handleFollowChange}
              />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
}

export async function getServerSideProps(context) {
  const { axios } = useAxios(context);
  const { username } = context.query;
  const { data: followers } = await axios.get(`/users/${username}/followers`);
  const profile = await fetchAccount(username, axios);
  return {
    props: {
      followers,
      profile,
    },
  };
}

Page.getLayout = function getLayout(page) {
  return <UserLayout mode="currentUser">{page}</UserLayout>;
};
