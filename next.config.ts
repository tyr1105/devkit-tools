import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/devkit-tools",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
