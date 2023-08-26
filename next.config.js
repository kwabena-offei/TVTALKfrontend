/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    API_ENV: process.env.API_ENV,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    APPLE_APP_ID: process.env.APPLE_APP_ID,
    GIPHY_API_KEY: process.env.GIPHY_API_KEY,
    FILESTACK_API_KEY: process.env.FILESTACK_API_KEY
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['wewe.tmsimg.com'],
  }
}

module.exports = nextConfig