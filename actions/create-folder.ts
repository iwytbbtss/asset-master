'use server;';

import S3 from '@/utils/s3-client';
import { HeadObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const createFolder = async (key: string) => {
  const client = S3.instance;
  if (await existsFolder(key)) {
    return;
  }
  const command = new PutObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key });
  return client.send(command);
};

// 이미 존재하는 폴더명
const existsFolder = async (key: string) => {
  const client = S3.instance;
  const command = new HeadObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key });

  try {
    await client.send(command);
    return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    if (error.name === 'NotFound') {
      return false;
    } else {
      throw error;
    }
  }
};

export default createFolder;
