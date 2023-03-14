import React, { useState } from "react";
import getConfig from "next/config";
import { CardHeader, Avatar } from "@mui/material";
import { cardHeaderMobileProps } from './ReactionCard.styled'
import { ActionsMenuDesktop } from './PopupActions/ActionsMenuDesktop'
import { ActionsMenuMobile } from "./PopupActions/ActionsMenuMobile";
import { TV_TALK_HOST_LOCAL, TV_TALK_HOST } from "../../util/constants";
import { useRouter } from "next/router";
import { ShareContext } from "../../util/ShareContext";
import Share from "../Chat/Share";

const ReactionsCardHeader = ({ userData, setShares, isMobile, commentType, tmsId, header, type, ...props }) => {
  const { id, username, image, timeAgo } = userData;
  const { publicRuntimeConfig } = getConfig();
  const router = useRouter();
  const baseUrl = publicRuntimeConfig.API_ENV === 'development' ? TV_TALK_HOST_LOCAL : TV_TALK_HOST;
  const copyLink = header ? `${baseUrl}${router.asPath}` : `${baseUrl}${router.asPath}#${id}`
  const [openShare, setOpenShare] = useState(false);
  const toggleShare = () => setOpenShare(!openShare);

  return (
    <ShareContext.Provider value={{ openShare, setOpenShare }}>
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
          isMobile
          ? <ActionsMenuMobile id={id} commentType={commentType} tmsId={tmsId} header={header} />
          : <ActionsMenuDesktop id={id} commentType={commentType} tmsId={tmsId} header={header} />
        }
        title={username}
        subheader={timeAgo}
        titleTypographyProps={{ fontWeight: 600, fontSize: isMobile ? '1rem' : '1.5rem' }}
        subheaderTypographyProps={{ fontWeight: 400, fontSize: '0.875rem', color: '#636D92' }}
      />
      <Share
        open={openShare}
        onClose={toggleShare}
        url={copyLink}
        isMobile={isMobile}
        id={id}
        type={type}
        setShares={setShares}
      />
    </ShareContext.Provider>
    
  );
};

export default ReactionsCardHeader;