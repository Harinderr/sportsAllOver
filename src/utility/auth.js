import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/utility/prismaclient";
import { getServerSession } from "next-auth";
import { compare, compareSync } from "bcryptjs";

export const authoption = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/form/login",
  },
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text", placeholder: "ram@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          // Any object returned will be saved in `user` property of the JWT
          console.log("there is an email pass error");
          return "there is an email pass error";
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        
        if (!existingUser) {
          console.log("no user email");
          return "no user email";
        }
        const passMatch = await compare(
          credentials.password,
          existingUser.password
        );
        if (!passMatch) {
          console.log("no user email");
          return "pass did not match";
        }
        const output =  {
          id: existingUser.id,
          username: existingUser.name,
          email: existingUser.email,
        }
        
        return output;
      },
    }),
  ],
  callbacks : {
    async jwt({ token, user }) {
     
      return {
        ...token,
        username : user.username
      }
    },
    async session({ session,user,  token }) {
      console.log(session,token,user)
      return {
        ...session,
        user : {
          ...session.user,
          username : token.username
        }
      }
    },

   

  },
 
};
export const getAuthSession = async () => getServerSession(authoption);
