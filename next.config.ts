import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@prisma/client": require.resolve("@prisma/client"),
    };
    return config;
  },
};

export default nextConfig;
