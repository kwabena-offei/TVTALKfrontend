import React, { useState, useMemo, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import TuneIcon from "@mui/icons-material/Tune";
import { debounce } from "lodash";
import useAxios from "../../services/api";
import Avatar from "@mui/material/Avatar";
import Resuls from "./Results";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { set } from "nprogress";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 49,
  backgroundColor: "#131B3F",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  margin: "0 auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SettingIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: "0",
  transform: "rotate(90deg)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex: "999999",
}));

const LoaderWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  position: "absolute",
  right: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "999999",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    minWidth: "300px",
    [theme.breakpoints.up("lg")]: {
      minWidth: "400px",
    },
  },
}));

const SiteSearch = () => {
  const router = useRouter();
  const [isListVisible, setListVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSettingIconClick = () => {
    // Navigate to another page when the setting icon is clicked
    const cookie = getCookie("token");
    !cookie ? router.push("/login") : router.push("/profile");
  };

  const { axios } = useAxios();
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setIsLoading(true);
    setSearchValue(e.target.value);
    performSearch(e.target.value);
    setListVisible(true);
  };

  const handleRouteChange = () => {
    setListVisible(false);
    setSearchValue("");
    setResults([]);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  const performSearch = useMemo(
    () =>
      debounce((query) => {
        const asyncFetch = async () => {
          if (query !== "") {
            const urlSafeValue = encodeURIComponent(query);
            try {
              const resp = await axios.get(`/search?query=${urlSafeValue}`);
              console.log("search", resp.data);
              setResults(resp.data);
              setIsLoading(false);
            } catch (error) {
              setIsLoading(false);
              console.error(error);
            }
          } else {
            setResults([]);
            setIsLoading(false);
          }
        };
        asyncFetch();
      }, 500),
    []
  );

  return (
    <Search style={{ md: { width: "290px" } }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <SettingIconWrapper onClick={handleSettingIconClick}>
        {isLoading ? <CircularProgress size={20} /> : <TuneIcon />}
      </SettingIconWrapper>
      <StyledInputBase
        value={searchValue}
        onFocus={setListVisible.bind(this, true)}
        onChange={handleInputChange}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />

      <Resuls
        results={results}
        visible={isListVisible}
        closeResults={setListVisible.bind(this, false)}
      />
    </Search>
  );
};

export default SiteSearch;
