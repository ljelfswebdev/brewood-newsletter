/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      outputFileTracingIncludes: {
        'app/api/pdf/route.js': ['node_modules/@sparticuz/chromium/**']
      }
    }
  };
  module.exports = nextConfig;