import ensureTrailingSlash from '@/utils/ensure-trailing-slash';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import removePrefix from '@/utils/remove-prefix';
import removeTrailingSlash from '@/utils/remove-trailing-slash';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Icons } from '../icon';
import { Button } from '../ui/button';

const DirectoryCard = ({ prefix, path }: { prefix?: string; path: string }) => {
  return (
    <Link href={`${ensureTrailingSlash(prefix)}${path}`}>
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
            src='/folder.svg'
            alt='folder'
            width={100}
            height={100}
          />
        </CardTitle>
        <CardContent className='px-4 pt-4 pb-0'>
          {removeTrailingSlash(prefix ? removePrefix(prefix, path) : path)}
        </CardContent>
      </Card>
    </Link>
  );
};

export default DirectoryCard;
