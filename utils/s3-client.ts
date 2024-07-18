import { S3Client } from '@aws-sdk/client-s3';

class S3 {
  private static _instacne: S3Client;

  static get instance(): S3Client {
    if (!this._instacne) {
      this._instacne = new S3Client({
        region: process.env.S3_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      });
    }

    return this._instacne;
  }
}

export default S3;
