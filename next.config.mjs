/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => [
    {
      source: '/',
      destination: '/contents',
      permanent: true,
    },
  ],
};

export default nextConfig;
