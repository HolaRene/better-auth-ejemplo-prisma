import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images:{
    remotePatterns:[
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      }
    ]
  }
};

export default nextConfig;
