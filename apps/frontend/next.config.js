/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_URL: 'http://localhost:3001',
    PAYPAL_CLIENT_ID:
      'AUkvj_6SKJwSUA6EqN3vyWq5Mp6aK7P1vErE6TVjbCoQ7uI_9TCpgc2jMEjmYnKrcqI_MERf-t2j1Rp2',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
