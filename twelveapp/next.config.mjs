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
    TWELVE_KEY: process.env.TWELVE_KEY,
    GROQ_API_KEY: process.env.GROQ_API_KEY
  },
};

export default nextConfig;
