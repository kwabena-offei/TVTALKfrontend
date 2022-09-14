import React from 'react';

// https://api.tvtalk.app/shows/{tmsID}

export async function getServerSideProps(context) {
    let show = fetch(`https://api.tvtalk.app/shows/${tmsID}`)
    return {
      props: {}, // will be passed to the page component as props
    }
  }
const chat = props => {
    return (
        <div>
            About Page
        </div>
    );
};

export default chat;