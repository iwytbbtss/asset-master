declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    // auth
    AUTH_SECRET: string;
    PASSWORD: string;
    // S3
    S3_BUCKET: string;
    S3_REGION: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    // CloudFront
    CLOUD_FRONT_PREFIX: string;
  }
}
