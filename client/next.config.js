/** @type {import('next').NextConfig} */
const nextConfig = {
  esling: {
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
