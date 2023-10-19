import React, { useState, useMemo, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';
import useAxios from "../../services/api";
import Avatar from '@mui/material/Avatar';
import Resuls from './Results';
import { useRouter } from 'next/router';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 49,
  backgroundColor: '#131B3F',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    // width: '100%',
    width: '335px',
    [theme.breakpoints.up('md')]: {
      width: '490px',
    },
  },
}));

const SiteSearch = () => {
  const router = useRouter();
  const [isListVisible, setListVisible] = useState(true);

  const { axios } = useAxios();
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    performSearch(e.target.value)
    setListVisible(true)
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setListVisible(false);
      setSearchValue('')
      setResults([])
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  const performSearch = useMemo(() => debounce(query => {
    const asyncFetch = async () => {
      if (query !== "") {
        const urlSafeValue = encodeURIComponent(query);
        try {
          const resp = await axios.get(`/search?query=${urlSafeValue}`);
          setResults(resp.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        setResults([]);
      }
    };
    asyncFetch();
  }, 500), []);




  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
      <Resuls results={results} visible={isListVisible} />
    </Search>
  )
};


export default SiteSearch;
