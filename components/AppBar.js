import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import { deleteCookie, hasCookie } from "cookies-next";
import { LoginButton } from './LoginButton'
import useAxios from '../services/api';
import { userAgent } from 'next/server';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { styled } from '@mui/material/styles';
import HouseButton from '../components/HouseButton';
import HeartButton from '../components/FavoritesButton';
import SiteSearch from '../components/SiteSearch';
import NotificationButton from '../components/NotificationButton';
import Link from 'next/link';

const pages = [
  {
    title: 'Chat By Show',
    route: '/chat',
  }, 
  {
    title: 'News',
    route: '/news'
  }
];

const HeaderButtonGroup = styled(Box)({
  display: 'flex',
  columnGap: '8px',
  marginRight: '12px',
  flexDirection: 'row',
})

function ResponsiveAppBar({ context }) {
  const { axios } = useAxios(context);
  const token = hasCookie('token', context);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.down('xl'));

  const settings = [
    {
      title: 'Profile',
      icon: <AccountCircleOutlinedIcon />,
      route: '/profile/reactions'
    },
    {
      title: 'Account Settings',
      icon: <SettingsOutlinedIcon />,
      route: '/profile'
    },
    {
      title: 'Logout',
      icon: <LogoutOutlinedIcon />,
      route: '/logout'
    }
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      let resp = await axios.get('/profile');
      setProfile(resp.data);
    };

    fetchProfile();
  }, [token]);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (key, reason) => {
    if (reason == 'backdropClick') {
      setAnchorElNav(null);
      return;
    }
    router.push(key);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (key, reason) => {
    if (key == '/logout') {
      deleteCookie('token');
      router.push('/login');
      setAnchorElUser(null);
      return;
    }
    if (reason == 'backdropClick') {
      setAnchorElUser(null);
      return;
    }
    router.push(key);
    setAnchorElUser(null);
  };

  return (
    <Container maxWidth="xl" style={{ paddingLeft: 0 }}>
      <AppBar position="static" style={{ justifyContent: 'space-between' }}>
        <Container maxWidth="xl" sx={{
          backgroundColor: '#090F27',
          paddingY: { md: 2 }
        }}>
          <Toolbar disableGutters sx={{
            backgroundColor: '#090F27',
          }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                textAlign: 'center',
                fontFamily: 'Gilroy',
                fontSize: '40px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '40px'
              }}
            >
              TV Talk
            </Typography>

            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                PaperProps={{
                  style: {
                    backgroundImage: 'none',
                  },
                }}

                sx={{
                  display: { xs: 'block', md: 'none' },
                  '.MuiMenu-list': {
                    backgroundImage: 'none',
                  },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.route} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" >{page.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              TV Talk
            </Typography>
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.route}
                  onClick={() => router.push(page.route)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Gilroy',
                    fontSize: 18,
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '24px'
                  }}
                >
                  {page.title}
                </Button>
              ))}
            </Box>

            {!isMobile && (

              <Box sx={{ width: 490, flexGrow: 2, display: { xs: 'flex', md: 'flex' } }}>
                <SiteSearch />
              </Box>
            )}

            {token
              ? <Box sx={{ flexGrow: 0 }}>
                <Link href='/' >
                  <a style={{ marginRight: 8 }}><HouseButton fontSize = 'small' /></a>
                </Link>
                <Link href='/profile/favorites' >
                  <a style={{ marginRight: 8 }}><HeartButton fontSize = 'small' /></a>
                </Link>
                <Link href='/notifications'>
                  <a style={{ marginRight: 12 }}><NotificationButton fontSize = 'small' token={token} /></a>
                </Link>

                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={profile?.username} src={profile?.image} />
                  </IconButton>
                </Tooltip>
                {profile && !isMobile && !isTablet && <span style={{
                  marginLeft: 10, color: '#EFF2FD',
                  textAlign: 'right',
                  fontFamily: 'Gilroy',
                  fontSize: 18,
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 1.2
                }}>Hi, {profile.username}</span>}
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.route} onClick={() => handleCloseUserMenu(setting.route)} sx={{
                      backgroundColor: '#131B3F',
                    }}>
                      {setting.icon}
                      <Typography textAlign="center">{setting.title}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              : <LoginButton />}
          </Toolbar>
        </Container>
        {isMobile && (
          <Container maxWidth="xl" sx={{
            backgroundColor: '#090F27',
            paddingY: { xs: 3, md: 2 },
          }}>
            <Box sx={{ width: 29, flexGrow: 2, display: { xs: 'flex', md: 'flex' } }}>
              <SiteSearch />
            </Box>
          </Container>
        )}

      </AppBar >
    </Container >
  );
}
export default ResponsiveAppBar;