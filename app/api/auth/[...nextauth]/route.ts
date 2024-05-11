import logger from '@/utils/logger';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    Credentials({
      credentials: { password: {} },
      authorize: async (credentials) => {
        logger.info(credentials);
        if (credentials?.password !== process.env.PASSWORD) {
          throw new Error('Incorrect Password');
        }

        return { id: 'admin' };
      },
    }),
  ],
  pages: {
    signIn: '/auth',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
