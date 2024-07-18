'use server';

import S3Object from '@/models/s3-object';
import ensureTrailingSlash from '@/utils/ensure-trailing-slash';
import S3 from '@/utils/s3-client';
import { ListObjectsV2Command } from '@aws-sdk/client-s3';

export const getObjects = async (prefix: string = '') => {
  const client = S3.instance;

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
    /**
     * 하위 디렉토리는 필터링
     * - prefix 이후에 추가적인 '/'가 없는지 확인
     */
    return key && key.startsWith(path) && key.split('/').length === path.split('/').length;
  }) as S3Object[] | undefined;
};
