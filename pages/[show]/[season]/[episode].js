import React from 'react';

export async function getServerSideProps({ params }) {
  const { show, season, episode } = params;

  return {
    props: { show, season, episode },
  };
}

const EpisodePage = ({ show, season, episode }) => {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>{`Show: ${show}`}</h1>
      <h2>{`Season: ${season}`}</h2>
      <h3>{`Episode: ${episode}`}</h3>
      <p>This dynamic route works on reload and shareable URLs.</p>
    </div>
  );
};

export default EpisodePage;
