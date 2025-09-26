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
  const router = useRouter();
  const { axios: axiosClient } = useAxios();

  const login = () => {
    setIsAuthenticated(true);
    fetchFavorites();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setFavorites({});
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
        mutateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
