import { AuthOptions } from 'next-auth';
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
  jwt: {
    maxAge: 60 * 60 * 24 * 1,
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        // eslint-disable-next-line no-param-reassign
        session.user.id = token.id;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // eslint-disable-next-line no-param-reassign
        token.id = user.id;
      }
      return token;
    },
  },
};
