'use server;';

import ensureTrailingSlash from '@/utils/ensure-trailing-slash';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

export const getObjects = async (prefix: string = '') => {
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
  });
  const res = await client.send(command);
  return res.Contents?.filter((element) => {
    // 디렉토리나 빈파일은 제외
    if (element.Size === 0) {
      return false;
    }
    const key = element.Key;
    const path = ensureTrailingSlash(prefix);
    // prefix 이후에 추가적인 '/'가 없는지 확인
    return key && key.startsWith(path) && key.split('/').length === path.split('/').length;
  });
};
