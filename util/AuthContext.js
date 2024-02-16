import { createContext } from "react";
import { hasCookie } from "cookies-next";
import React, { useState, useEffect } from "react";
import useAxios from "../services/api";
import { useRouter } from "next/router";

export const AuthContext = createContext({
  isAuthenticated: false,
  favorites: {},
  toggleFavorite: () => {},
  login: () => {},
  logout: () => {},
  fetchProfile: () => {},
});

export const hasCookieToken = (context) => {
  if (context && context.req) {
    // Check cookies on the server-side
    return hasCookie("token", context);
  }

  // Check cookies on the client-side
  return hasCookie("token");
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(hasCookieToken());
  const [favorites, setFavorites] = useState({});
  const [profile, setProfile] = useState({});
  const router = useRouter();
  const { axios } = useAxios();

  const login = () => {
    setIsAuthenticated(true);
    fetchFavorites();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setFavorites({});
  };

  const fetchProfile = async () => {
    if (isAuthenticated) {
      let resp = await axios.get("/profile");

      setProfile(resp.data);
    }
  };

  const fetchFavorites = async () => {
    if (isAuthenticated) {
      let resp = await axios.get("/likes");
      setFavorites(resp.data);
    }
  };

  // {liked: true, tmsId: 123, comment_id: 123, sub_comment_id: 123, story_id: 123 }
  const toggleFavorite = async ({ identifier, liked }) => {
    if (isAuthenticated) {
      const updatedFavorites = await axios.post("/likes", {
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
        fetchProfile,
        profile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
