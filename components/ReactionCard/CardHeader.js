import React from "react";
import { CardHeader, Avatar } from "@mui/material";
import { cardHeaderMobileProps } from './ReactionCard.styled'
import { ActionsMenuDesktop } from './PopupActions/ActionsMenuDesktop'
import { ActionsMenuMobile } from "./PopupActions/ActionsMenuMobile";

const ReactionsCardHeader = ({ userData, isMobile, commentType, tmsId, header, ...props }) => {
  const { id, username, image, timeAgo } = userData;
  return (
    <CardHeader
      {...props}
      classes={{ action: "align-self-center" }}
      sx={ isMobile ? cardHeaderMobileProps : { paddingX: 3.75, paddingY: 2.5, alignItems: "center" }}
      avatar={
        <Avatar
          sx={isMobile ? { width: 40, height: 40 } : { width: 60, height: 60, border: "1.5px solid #090F27" }}
          aria-label={`avatar-${username}-${id}`}
          src={image}
          alt={`${username}_avatar`}
        >
          {username}
        </Avatar>
      }
      action={
        isMobile ? <ActionsMenuMobile id={id} commentType={commentType} tmsId={tmsId} header={header}/> : <ActionsMenuDesktop id={id} commentType={commentType} tmsId={tmsId} header={header} />
      }
      title={username}
      subheader={timeAgo}
      titleTypographyProps={{ fontWeight: 600, fontSize: isMobile ? '1rem' : '1.5rem' }}
      subheaderTypographyProps={{ fontWeight: 400, fontSize: '0.875rem', color: '#636D92' }}
    />
  );
};

export default ReactionsCardHeader;