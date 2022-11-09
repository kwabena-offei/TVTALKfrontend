import React from "react";
import {
  CardContent,
  Stack
} from "@mui/material";
import { CardWrapper } from "./NotificationCard.styled";


const NotificationCard = (props) => {
  const { children } = props;
  const { actor } = children;
  // console.log('children', children)

  return (
    <CardWrapper>
      <div>hohoho</div>
    </CardWrapper>
  );
};

export default NotificationCard;