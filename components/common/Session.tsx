'use client';

import { useSession } from 'next-auth/react';

const Session = () => {
  const { status } = useSession();
  return <div>{status}</div>;
};

export default Session;
