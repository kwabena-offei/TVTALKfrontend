import React from "react";
import { IFrameComponent } from "../../../../components/IFrameComponent";
import { NewsIFrameLayout } from "../../../../components/NewsIFrameLayout";
import { NewsMainContainer } from "../../../../components/NewsCard/NewsCard.styled";


export async function getServerSideProps(context) {
  // console.log('context', context)
  const { source_url, source } = context.query
  console.log('[context]', context)
  return {
    props: {
      url: source_url,
      source: source
    }, // will be passed to the page component as props
  };
}

export default function Page ({ url, source }) {
  return (
    <>
      <NewsMainContainer maxWidth="xl">
        <NewsIFrameLayout source={source} url={url}/>
      </NewsMainContainer>
      <IFrameComponent url={url}/>
    </>
  );
};

