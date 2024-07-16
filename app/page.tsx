import { getDirectories } from '@/actions/get-directories';
import { getObjects } from '@/actions/get-objects';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import addTrailingSlash from '@/utils/add-trailing-slash';
import Image from 'next/image';
import Link from 'next/link';

const Page = async () => {
  const directories = await getDirectories();
  const objects = await getObjects('images');
  console.log(objects);
  return (
    <main className='w-full p-10'>
      <div className='flex flex-wrap gap-5 '>
        {directories?.map((e) => (
          <Link key={e.Prefix} href={`/${e.Prefix}`}>
            <Card className='w-80 h-60 flex flex-col items-center p-4'>
              <CardContent>
                <Image className='w-24 h-24' src='/folder.svg' alt='folder' width={0} height={0} />
              </CardContent>
              <CardFooter>{e.Prefix}</CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      <hr className='my-10' />
      {objects?.map((e) => (
        <Card key={e.Key} className='w-80 h-60 flex flex-col items-center p-4'>
          <CardContent>
            <Image
              className='w-24 h-24'
              src={`${addTrailingSlash(process.env.CLOUD_FRONT_PREFIX)}${e.Key}`}
              alt={e.Key ?? ''}
              width={100}
              height={100}
            />
          </CardContent>
          <CardFooter>{e.Key}</CardFooter>
        </Card>
      ))}
    </main>
  );
};

export default Page;
