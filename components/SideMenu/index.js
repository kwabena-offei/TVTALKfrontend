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

function SideMenu() {
  const router = useRouter();
  const currentRoute = router.asPath;

  const menuList = [
    {
      label: "Edit Profile",
      href: "/profile/edit",
    },
    {
      label: "Terms & Conditions",
      href: "/terms_and_conditions",
    },
    {
      label: "Privacy Policy",
      href: "/policy",
    },
    {
      label: "Feedback",
      href: "/feedback",
    },
    {
      label: "Change Password",
      href: "/profile/change_password",
    },
  ];

  const listMenu = (
    <div>
      <List>
        {menuList.map((menuItem, index) => {
          const listTitle =
            currentRoute === menuItem.href ? (
              <PrimaryMenuLabel label={menuItem.label} />
            ) : (
              <SecondaryMenuLabel label={menuItem.label} />
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
