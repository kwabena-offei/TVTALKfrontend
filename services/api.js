import axios from 'axios';
import { TV_TALK_API, TV_TALK_API_LOCAL } from '../util/constants';

const instance = axios.create({
  baseURL: process.env.API_ENV === 'production' ? TV_TALK_API : TV_TALK_API_LOCAL
});

export default instance;