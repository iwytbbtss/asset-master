import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest } from 'next/server';
import { Readable } from 'stream';

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const key = searchParams.get('key');

    if (!key) {
      throw Error('key is required');
    }

    const client = new S3Client({
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
    });
    const res = await client.send(command);
    const stream = res.Body;
    if (stream instanceof Readable) {
      const readableStream = new ReadableStream({
        start(controller) {
          stream.on('data', (chunk) => controller.enqueue(chunk));
          stream.on('end', () => controller.close());
          stream.on('error', (err) => controller.error(err));
        },
      });
      return new Response(readableStream, {
        headers: {
          'Content-Type': res.ContentType ?? '',
        },
      });
    }

    throw Error();
  } catch (error) {
    return new Response(null, { status: 500 });
  }
};
