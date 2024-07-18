import { _Object } from '@aws-sdk/client-s3';

export default interface S3Object extends _Object {
  Key: string;
}
