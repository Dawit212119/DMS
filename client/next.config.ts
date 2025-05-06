import type { NextConfig } from "next";

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
