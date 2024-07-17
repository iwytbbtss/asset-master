'use server';

import { getObjects } from '@/actions/get-objects';
import ensureTrailingSlash from '@/utils/ensure-trailing-slash';
import { Card, CardContent, CardFooter } from '../ui/card';
import Image from 'next/image';
import removePrefix from '@/utils/remove-prefix';
import removeTrailingSlash from '@/utils/remove-trailing-slash';

const Objects = async ({ prefix }: { prefix?: string }) => {
  const objects = await getObjects(removeTrailingSlash(prefix));
  return (
    <div className='flex flex-wrap gap-5'>
      {objects?.map((e) => (
        <Card key={e.Key} className='w-80 h-60 flex flex-col items-center p-4'>
          <CardContent>
            <Image
              className='w-24 h-24 p-3 rounded-lg bg-zinc-100'
              src={`${ensureTrailingSlash(process.env.CLOUD_FRONT_PREFIX)}${e.Key}`}
              alt={e.Key!}
              width={100}
              height={100}
            />
          </CardContent>
          <CardFooter>{prefix ? removePrefix(prefix, e.Key!) : e.Key}</CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Objects;
