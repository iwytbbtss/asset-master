'use client';

import ensureTrailingSlash from '@/utils/ensure-trailing-slash';
import removePrefix from '@/utils/remove-prefix';
import { _Object } from '@aws-sdk/client-s3';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import isValidImageFile from '@/utils/is-valid-image-file';
import { Button } from '../ui/button';
import { Icons } from '../icon';
import { useToast } from '../ui/use-toast';

const ObjectCard = ({ object, prefix }: { object: _Object; prefix?: string }) => {
  const { toast } = useToast();

  const key = object.Key!;
  const url = `${ensureTrailingSlash(process.env.CLOUD_FRONT_PREFIX)}${key}`;
  const src = isValidImageFile(key) ? url : '/file.svg';
  const fileName = prefix ? removePrefix(prefix, key) : key;
  return (
    <Card className='relative flex flex-col items-center px-12 py-4'>
      <CardHeader className='absolute top-0 right-0 p-2'>
        <Button variant='ghost' size='icon'>
          <Icons.EllipsisVertical />
        </Button>
      </CardHeader>
      <CardTitle>
        <Image
          className='w-24 h-24 p-3 rounded-lg bg-zinc-100'
          src={src}
          alt={key}
          width={100}
          height={100}
        />
      </CardTitle>
      <CardContent>{fileName}</CardContent>
      <CardFooter className='gap-2 px-4 py-0'>
        <Button
          variant='outline'
          size='icon'
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(url);
              toast({
                variant: 'default',
                title: 'Copy Comleted',
              });
            } catch (error) {
              toast({
                variant: 'destructive',
                title: 'Copy Failed',
              });
            }
          }}
        >
          <Icons.Copy />
        </Button>
        <Button
          variant='outline'
          size='icon'
          onClick={async () => {
            const blob = await fetch(`/api/objects?key=${key}`).then((res) => res.blob());
            const objectUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = objectUrl;
            if (fileName) {
              a.download = fileName;
            }
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(objectUrl);
          }}
        >
          <Icons.Download />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ObjectCard;
