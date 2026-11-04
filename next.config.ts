
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination:
          "https://studiospace-server-ipdq.onrender.com/api/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
