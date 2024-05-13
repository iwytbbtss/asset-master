import NextAuth, { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: 'password',
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
  secret: process.env.AUTH_SECRET,
  // callbacks: {
  //   signIn: () => {}
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
