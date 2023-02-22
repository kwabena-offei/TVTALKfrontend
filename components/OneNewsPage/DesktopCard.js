import React from "react";
import {
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Link,
  Stack,
  styled,
} from "@mui/material";

import {
  CardWrapper,
  DescriptionNews,
  SourceBox,
} from "../NewsCard/NewsCard.styled";
import PrimaryButton from "../PrimaryButton";

const MediaNews = styled(CardMedia)({
  height: 540,
  ["@media (max-width: 900px)"]: {
    height: 320,
  },
});

const OneNewsCardDesktop = ({
  description,
  id,
  image_url,
  source,
  title,
  url,
  parsedUrl,
  shortenedHostUrl
}) => {
  const image = image_url ? image_url : "/assets/no-picture-available.jpg";

  return (
    <CardWrapper id={id}>
      <MediaNews image={image} component="img" alt={"title"} />
      <CardContent
        sx={{
          paddingX: "30px",
          flexGrow: 1,
        }}
      >
        <Stack direction="row" justifyContent="flex-start" marginBottom={2}>
          <SourceBox>{source}</SourceBox>
        </Stack>
        <CardHeader
          title={title}
          titleTypographyProps={{ fontSize: 32, fontWeight: 500 }}
          sx={{ padding: 0, paddingBottom: "20px" }}
        />
        <DescriptionNews isMobile={false}>{description}</DescriptionNews>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "center",
          paddingBottom: "30px",
        }}
      >
        <PrimaryButton component={Link} target='_blank' href={url}>Read on {shortenedHostUrl}</PrimaryButton>
      </CardActions>
    </CardWrapper>
  );
};

export default OneNewsCardDesktop;
