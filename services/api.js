import axios from 'axios';
import { TV_TALK_API, TV_TALK_API_LOCAL } from '../util/constants';
import { getCookies } from 'cookies-next';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const useAxios = (context) => {
  console.log('get cookies', getCookies({ req: context.req, res: context.res }))
  const cookies = context ? getCookies({ req: context.req, res: context.res }) : getCookies();

  const instance = axios.create({
    // baseURL: publicRuntimeConfig.API_ENV === 'development' ? TV_TALK_API_LOCAL : TV_TALK_API,
    baseURL: TV_TALK_API,
  });

  if (cookies.token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${cookies.token}`;
  }

  return {
    axios: instance
  }
}


export default useAxios;