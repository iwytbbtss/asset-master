'use server';

import removePrefix from '@/utils/remove-prefix';
import S3 from '@/utils/s3-client';
import { ListObjectsV2Command } from '@aws-sdk/client-s3';

export const getDirectories = async (prefix: string = '') => {
  const client = S3.instance;

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
