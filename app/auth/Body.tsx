'use client';

import { useSession } from 'next-auth/react';
import { Icons } from '@/components/icon';
import SignOutButton from './SignOutButton';
import PasswordForm from './PasswordForm';

const Body = () => {
  const { status } = useSession();
  switch (status) {
    case 'authenticated':
      return <SignOutButton />;
    case 'loading':
      return <Icons.Spinner className='animate-spin' />;
    case 'unauthenticated':
      return <PasswordForm />;
    default:
      return <div />;
  }
};

export default Body;
