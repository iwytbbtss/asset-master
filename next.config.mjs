/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    PASSWORD: process.env.PASSWORD,
    S3_BUCKET: process.env.S3_BUCKET,
    S3_REGION: process.env.S3_REGION,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    CLOUD_FRONT_PREFIX: process.env.CLOUD_FRONT_PREFIX,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ypet.co.kr',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
