import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ⚠️ Only for emergencies!
  },
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
