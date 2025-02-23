import axios from 'axios';
import { TV_TALK_API, TV_TALK_API_LOCAL } from '../util/constants';
import { getCookies } from 'cookies-next';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const API_URL = publicRuntimeConfig.API_ENV === 'development' ? TV_TALK_API_LOCAL : publicRuntimeConfig.TV_TALK_API;

export const buildAPIUrl = (path) => {
  return `${API_URL}${path}`;
};

const useAxios = (context) => {
  const cookies = context ? getCookies({ req: context.req, res: context.res }) : getCookies();

  const instance = axios.create({
    baseURL: API_URL,
  });

  if (cookies.token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${cookies.token}`;
  }

  return {
    axios: instance
  }
}


export default useAxios;