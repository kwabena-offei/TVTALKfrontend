import { Grid } from "@mui/material";
import React, { useState, useContext } from "react";
import { UserLayout, fetchAccount } from "../../../components/UserLayout";
import FollowerCard from "../../../components/FollowerCard/FollowerCard";
import FollowerCardMobile from "../../../components/FollowerCard/FollowerCardMobile";
import useAxios from "../../../services/api";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import { AuthContext } from "../../../util/AuthContext";

export default function Page({ following, profile }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { profile: currentUser } = useContext(AuthContext);

  const { results: followingList, pagination } = following;
  
  // Track which users have been unfollowed to remove them from the list
  const [unfollowedUsers, setUnfollowedUsers] = useState([]);

  // Check if we're viewing our own profile
  const isOwnProfile = currentUser?.id === profile?.id;

  const handleUnfollow = (userId) => {
    // Add the user to the unfollowed list to filter them out
    setUnfollowedUsers(prev => [...prev, userId]);
  };

  // Callback to refresh server-side props after follow/unfollow
  const handleFollowChange = () => {
    // Force Next.js to refetch getServerSideProps
    router.replace(router.asPath);
  };

  // Filter out unfollowed users
  const displayedFollowing = followingList?.filter(
    user => !unfollowedUsers.includes(user.id)
  );

  return (
    <Grid container spacing={isMobile ? 2 : 3.75}>
      {displayedFollowing?.map((follower) => {
        return (
          <Grid
            key={`card-following-${follower.id}`}
            item
            xs={12}
            md={3}
            lg={2}
          >
            {isMobile ? (
              <FollowerCardMobile 
                {...follower} 
                context="following"
                isOwnProfile={isOwnProfile}
                onUnfollow={handleUnfollow}
                onFollowChange={handleFollowChange}
              />
            ) : (
              <FollowerCard 
                {...follower} 
                context="following"
                isOwnProfile={isOwnProfile}
                onUnfollow={handleUnfollow}
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
  const { data: following } = await axios.get(`/users/${username}/following`);
  const profile = await fetchAccount(username, axios);
  return {
    props: {
      following,
      profile,
    },
  };
}

Page.getLayout = function getLayout(page) {
  return <UserLayout mode="currentUser">{page}</UserLayout>;
};
