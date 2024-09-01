/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: '/api',
          destination: 'http://localhost:8080', // Proxy to Backend
        },
      ]
    },
  }