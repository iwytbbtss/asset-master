import NextAuth, { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      credentials: { password: {} },
      authorize: async (credentials) => {
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
