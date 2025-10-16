import { createContext } from "react";
import { hasCookie } from "cookies-next";
import React, { useState, useEffect } from "react";
import useAxios from "../services/api";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";

export const AuthContext = createContext({
  isAuthenticated: false,
  favorites: {},
  toggleFavorite: () => {},
  login: () => {},
  logout: () => {},
  mutateProfile: () => {},
  unreadCount: 0,
  fetchUnreadNotifications: () => {},
  markAllNotificationsAsRead: () => {},
});

export const hasCookieToken = (context) => {
  if (context && context.req) {
    // Check cookies on the server-side
    return hasCookie("token", context);
  }

  // Check cookies on the client-side
  return hasCookie("token");
};

// Use the configured axios client so Authorization is consistently attached
// and baseURL is correct across SSR and CSR.
const fetcherWith = (axiosClient) => (url) =>
  axiosClient.get(url).then((res) => res.data);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(hasCookieToken());
  const [favorites, setFavorites] = useState({});
  const [profile, setProfile] = useState({});
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();
  const { axios: axiosClient } = useAxios();

  const login = (user) => {
    setIsAuthenticated(true);
    // Pre-populate the SWR cache with the user data from login
    // The 'false' flag prevents an unnecessary re-fetch
    mutateProfile(user, false);
    setProfile(user); // also update the local state
    fetchFavorites();
    fetchUnreadNotifications();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setFavorites({});
    setProfile({}); // Clear the profile from the react state
    setUnreadCount(0); // Clear notifications count
    mutateProfile(null, false); // Clear the SWR cache for the /profile key
  };


  const { data, error, mutate: mutateProfile } = useSWR(
    "/profile",
    fetcherWith(axiosClient)
  );
  useEffect(() => {
    if (data) {
      setProfile(data);
      setIsAuthenticated(true);
    }
  }, [data]);

  // After hydration on the client, re-evaluate cookie presence
  // so UI reflects correct auth state following a hard refresh.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cookieAuth = hasCookieToken();
      // Only update if there's a meaningful change to avoid unnecessary re-renders
      if (cookieAuth !== isAuthenticated) {
        setIsAuthenticated(cookieAuth);
      }
    }
  }, []);

  const fetchFavorites = async () => {
    if (isAuthenticated) {
      let resp = await axiosClient.get("/likes");
      setFavorites(resp.data);
    }
  };

  const fetchUnreadNotifications = async () => {
    if (isAuthenticated) {
      try {
        const resp = await axiosClient.get("/notifications/unread");
        setUnreadCount(resp.data.results?.length || 0);
      } catch (error) {
        console.error("Error fetching unread notifications:", error);
      }
    }
  };

  const markAllNotificationsAsRead = async () => {
    if (isAuthenticated) {
      try {
        await axiosClient.patch("/notifications/unread/all", {
          notification: { read: true },
        });
        // Immediately update the local state
        setUnreadCount(0);
      } catch (error) {
        console.error("Error marking notifications as read:", error);
      }
    }
  };

  // {liked: true, tmsId: 123, comment_id: 123, sub_comment_id: 123, story_id: 123 }
  const toggleFavorite = async ({ identifier, liked }) => {
    if (isAuthenticated) {
      const updatedFavorites = await axiosClient.post("/likes", {
        ...identifier,
        liked,
      });
      setFavorites(updatedFavorites.data);
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchFavorites();
    fetchUnreadNotifications();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        favorites,
        toggleFavorite,
        login,
        logout,
        fetchFavorites,
        profile,
        mutateProfile,
        unreadCount,
        fetchUnreadNotifications,
        markAllNotificationsAsRead,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
