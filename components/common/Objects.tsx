'use server';

import { getObjects } from '@/actions/get-objects';
import removeTrailingSlash from '@/utils/remove-trailing-slash';
import ObjectCard from './ObjectCard';

const Objects = async ({ prefix }: { prefix?: string }) => {
  const objects = await getObjects(removeTrailingSlash(prefix));
  return (
    <div className='flex flex-wrap gap-5'>
      {objects?.map((e) => <ObjectCard key={e.Key} object={e} prefix={prefix} />)}
    </div>
  );
};

export default Objects;
