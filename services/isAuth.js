import { hasCookie } from 'cookies-next';

export const isAuthenticated = (context) => {
  if(context.req) {
    // -- get cookies on backend --
    return hasCookie('token', context);
  }
  // -- get cookies on frontend --
  return hasCookie('token');
}