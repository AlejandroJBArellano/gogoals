import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [Google],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn() {
      // const resp = await loops.createContact(profile?.email!);
      // if (!resp.success) {
      //   console.log("LOOPS_ERROR_SIGN_IN_CREATE_CONTACT", resp.message);
      // }
      // const customer = await stripe.customers.create({
      //   email: profile?.email,
      //   name: profile?.name,
      // });
      return true;
    },
    async jwt({ token }) {
      const user = await prisma.user.findUnique({
        where: { email: token.email! },
      });

      token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user.id = (token.user as any)?.id;
      // session.user.customer = (token.user as any)?.customer;
      // session.user.role = (token.user as any)?.role;
      return session;
    },
  },
});
