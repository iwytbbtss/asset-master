'use server';

import { getDirectories } from '@/actions/get-directories';
import DirectoryCard from './DirectoryCard';

const Directories = async ({ prefix }: { prefix?: string }) => {
  const directories = await getDirectories(prefix);

  if (!directories) {
    return <></>;
  }

  return (
    <>
      <div className='flex flex-wrap gap-5'>
        {directories?.map((e) => <DirectoryCard key={e} prefix={prefix} path={e} />)}
      </div>
      <hr className='my-10' />
    </>
  );
};

export default Directories;
