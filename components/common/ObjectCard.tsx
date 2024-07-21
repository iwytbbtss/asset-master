'use client';

import ensureTrailingSlash from '@/utils/ensure-trailing-slash';
import removePrefix from '@/utils/remove-prefix';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import isValidImageFile from '@/utils/is-valid-image-file';
import { Button } from '../ui/button';
import { Icons } from '../icon';
import S3Object from '@/models/s3-object';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const ObjectCard = ({ object, prefix }: { object: S3Object; prefix?: string }) => {
  const key = object.Key;
  const url = `${ensureTrailingSlash(process.env.CLOUD_FRONT_PREFIX)}${key}`;
  const src = isValidImageFile(key) ? url : '/file.svg';
  const fileName = prefix ? removePrefix(prefix, key) : key;

  // 링크 복사
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Copy Comleted');
    } catch (error) {
      toast.error('Copy Failed');
    }
  };

  const downloadObject = () => {
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
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
          resolve(fileName);
        } catch (error) {
          reject();
        }
      }),
      {
        loading: 'Loading...',
        success: (name) => {
          return 'Successfully Downloaded';
        },
        error: 'Error Occurred',
      },
    );
  };

  return (
    <Card className='relative flex flex-col items-center px-16 py-8'>
      <CardHeader className='absolute top-0 right-0 p-2'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Icons.EllipsisVertical />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
      <CardContent className='p-4'>{fileName}</CardContent>
      <CardFooter className='gap-2 px-4 py-0'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline' size='icon' onClick={copyLink}>
                <Icons.Copy />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy Link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline' size='icon' onClick={downloadObject}>
                <Icons.Download />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download Object</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default ObjectCard;
