import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  cacheOnFrontEndNav: true,
  fallbacks: {
    document: "/~offline",
  },
});

const nextConfig: NextConfig = {
  // Silence "webpack config but no turbopack config" when PWA plugin adds webpack.
  // Dev uses Turbopack; production build uses webpack (via next build --webpack) for PWA.
  turbopack: {},
};

export default withPWA(nextConfig);
