/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ["*.preview.same-app.com"],
    images: {
      unoptimized: false,
      formats: ['image/webp', 'image/avif'],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      domains: [
        "source.unsplash.com",
        "images.unsplash.com",
        "ext.same-assets.com",
        "ugc.same-assets.com",
      ],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "source.unsplash.com",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "images.unsplash.com",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "ext.same-assets.com",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "ugc.same-assets.com",
          pathname: "/**",
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  