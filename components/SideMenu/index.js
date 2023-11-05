import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import {
  PrimaryMenuLabel,
  SecondaryMenuLabel,
} from "./SideMenu.styled";
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

function SideMenu() {
  const router = useRouter();
  const currentRoute = router.asPath;
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const menuList = [
    {
      label: "Edit Profile",
      href: '/profile',
    },
    // {
    //   label: "Terms & Conditions",
    //   href: "/profile/terms_and_conditions",
    // },
    {
      label: "Privacy Policy",
      href: "/profile/policy",
    },
    // {
    //   label: "Feedback",
    //   href: "/profile/feedback",
    // },
    {
      label: "Change Password",
      href: "/profile/change_password",
    },
  ];

  const listMenu = (
    <div>
      <List sx={{ paddingY: 6 }}>
        {menuList.map((menuItem, index) => {
          const listTitle =
            currentRoute === menuItem.href ? (
              <PrimaryMenuLabel label={menuItem.label} isTablet={isTablet} />
            ) : (
              <SecondaryMenuLabel label={menuItem.label} isTablet={isTablet} />
            );
          return (
            <ListItem key={menuItem.label} disablePadding>
              <ListItemButton component="a" href={menuItem.href}>
                <ListItemText primary={listTitle} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return listMenu;
}

export default SideMenu;
