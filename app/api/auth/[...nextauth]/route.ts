import logger from '@/utils/logger';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: { password: {} },
      authorize: async (credentials) => {
        logger.info(credentials);
        if (credentials?.password !== process.env.PASSWORD) {
          return null;
        }

        return { id: 'admin' };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
