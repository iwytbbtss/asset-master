'use server';

import { getDirectories } from '@/actions/get-directories';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '../ui/card';
import Image from 'next/image';
import ensureTrailingSlash from '@/utils/ensure-trailing-slash';
import removePrefix from '@/utils/remove-prefix';
import removeTrailingSlash from '@/utils/remove-trailing-slash';

const Directories = async ({ prefix }: { prefix?: string }) => {
  const directories = await getDirectories(prefix);

  if (!directories) {
    return <></>;
  }

  return (
    <>
      <div className='flex flex-wrap gap-5'>
        {directories?.map((e) => (
          <Link key={e} href={`${ensureTrailingSlash(prefix)}${e}`}>
            <Card className='w-80 h-60 flex flex-col items-center p-4'>
              <CardContent>
                <Image
                  className='w-24 h-24'
                  src='/folder.svg'
                  alt='folder'
                  width={96}
                  height={96}
                />
              </CardContent>
              <CardFooter>{removeTrailingSlash(prefix ? removePrefix(prefix, e) : e)}</CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      <hr className='my-10' />
    </>
  );
};

export default Directories;
