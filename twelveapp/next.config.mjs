/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },

  // Ensure environment variables are available
  env: {
    NEXT_PUBLIC_TWELVE_KEY: process.env.NEXT_PUBLIC_TWELVE_KEY,
  },
};

export default nextConfig;
