'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Icons } from '../icon';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useEffect } from 'react';
import NewButton from './NewButton';

const Navigator = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <nav className='flex items-center gap-2 p-4'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='outline' size='icon' onClick={router.back}>
              <Icons.ArrowLeft />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Back</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='outline' size='icon' onClick={router.forward}>
              <Icons.ArrowRight />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Forward</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='outline' size='icon' onClick={router.refresh}>
              <Icons.Reload size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reload</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className='grow'></div>
      <NewButton />
    </nav>
  );
};

export default Navigator;
