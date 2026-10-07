import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "pub-6e164401844e42a18bdff5533ec36d1f.r2.dev",
      },
      {
        protocol: "https",
        hostname: "www.selfdrive4u.com",
      },
    ],
  },
};

export default nextConfig;
