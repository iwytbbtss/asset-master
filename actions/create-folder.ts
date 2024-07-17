'use server;';

import { HeadObjectCommand, S3Client } from '@aws-sdk/client-s3';

// async function createFolder(Bucket, Key) {
//   const client = new S3Client();
//   const command = new PutObjectCommand({ Bucket, Key });
//   return client.send(command);
// }

export const existsFolder = async (name: string) => {
  const client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  const command = new HeadObjectCommand({ Bucket: process.env.S3_BUCKET, Key: name });

  try {
    await client.send(command);
    return true;
  } catch (error) {
    console.error(error);
    if (error.name === 'NotFound') {
      return false;
    } else {
      throw error;
    }
  }
};
