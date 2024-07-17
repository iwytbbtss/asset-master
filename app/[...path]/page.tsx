import Directories from '@/components/common/Directories';
import Objects from '@/components/common/Objects';
import ensureTrailingSlash from '@/utils/ensure-trailing-slash';

const page = ({ params }: { params: { path: string[] } }) => {
  const prefix = ensureTrailingSlash(params.path.join('/'));
  return (
    <main className='w-full p-10'>
      <Directories prefix={prefix} />
      <Objects prefix={prefix} />
    </main>
  );
};

export default page;
