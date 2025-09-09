import type { NextConfig } from "next";

export default {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/funds",
        permanent: true,
      },
    ];
  },
} satisfies NextConfig;
