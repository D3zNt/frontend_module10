import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {hostname: "portal.chatime.com"}
    ]
  }
};

export default nextConfig;
