/** @type {import('next').NextConfig} */
const nextConfig = {
  // No static export - keep API routes working
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
