/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
      missingSuspenseWithCSRBailout: false,
  },
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: '**',
              port: '',
              pathname: '**',
          },
      ],
      domains: ['*'],
  }
};

export default nextConfig;
