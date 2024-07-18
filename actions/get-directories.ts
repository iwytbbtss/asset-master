'use server';

import removePrefix from '@/utils/remove-prefix';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

export const getDirectories = async (prefix: string = '') => {
  const client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const command = new ListObjectsV2Command({
    Bucket: process.env.S3_BUCKET,
    Prefix: prefix,
    Delimiter: '/',
  });
  // const command = new HeadObjectCommand({ Bucket: process.env.S3_BUCKET, Key: 'images/' });
  const res = await client.send(command);
  return res.CommonPrefixes?.filter((element) => element.Prefix)?.map((e) =>
    removePrefix(prefix, e.Prefix!),
  );
};
