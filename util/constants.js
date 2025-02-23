import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const TV_TALK_API = publicRuntimeConfig.TV_TALK_API;
export const TV_TALK_WEBSOCKET = `wss://${TV_TALK_API}/websocket`
export const TV_TALK_WEBSOCKET_LOCAL = 'ws://9647-128-124-148-238.ngrok.io/websocket';
export const TV_TALK_API_LOCAL = 'https://9647-128-124-148-238.ngrok.io';
// export const TV_TALK_API_LOCAL = 'https://api.tvtalk.app';
export const TV_TALK_HOST = 'https://gotvchat.com';
export const TV_TALK_HOST_LOCAL = 'http://localhost:3000';

// -- Quote for share link --
export const QUOTE = 'Look what we got here on TV_Talk!'

export const unAuthLikes = {
  data: {
    shows: [],
    comments: [],
    sub_comments: [],
    stories: []
  }
}