import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginResponse, UserFromDB } from "./interfaces/user";
import { login } from "./actions/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  secret: process.env.NEXT_JWT_SECRET ?? "session_jwt_secret",
  providers: [
    Credentials({
      name: "Credentials",

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const result: LoginResponse = await login({
            email,
            password,
          });

          if (result.success) {
            return result.payload;
          } else {
            throw new Error("Failed to authorize");
          }
        } catch (error) {
          if (error instanceof Error) {
            throw new AuthError(error.message);
          } else {
            throw new AuthError("An unexpected error occurred");
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = (user as LoginResponse["payload"]).name;
        token.email = (user as LoginResponse["payload"]).email;
        token.role = (user as LoginResponse["payload"]).role;
      }
      return token;
    },
    async session({ session, token }) {
      const user = session.user as UserFromDB;

      user.id = token.id as string;
      user.name = token.username as string;
      user.email = token.email as string;
      user.role = token.role as string;

      return session;
    },
    async authorized({ auth }) {
      return !!auth;
    },
  },
});
