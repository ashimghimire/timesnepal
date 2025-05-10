import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // assetPrefix: '/assets/', // Replace with your custom prefix
  images: {
    unoptimized: true, // Optional, to disable automatic image optimization
  },
};

export default nextConfig;
