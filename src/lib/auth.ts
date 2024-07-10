import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db"; 
import { users } from "./db/schema";
import { eq } from 'drizzle-orm';
import {} from "next-auth/jwt";



export enum UserRole {
  ADMIN = "admin",
  MODERATOR = "moderator",
  USER = "user"
};

type UserId = string;

export type User = {
  id: UserId;
  email: string;
  role: UserRole;
};

export type Session = DefaultSession & {
  user: User;
};

type JWT = {
  id: UserId;
  email: string;
  role: UserRole;
};

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    email: string;
    role: UserRole;
  }
}





export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt"
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          console.log("Credentials are missing");
          return null;
        }

        try {
          const obtainedUser = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email as string))
            .limit(1);

          if (!obtainedUser.length) {
            console.log("No User Found");
            return null;
          }

          if (!obtainedUser[0]?.password) {
            console.log("No Password Found for user");
            return null;
          }

          const isUser = await compare(
            credentials.password as string,
            obtainedUser[0]!.password
          );

          const userRole = obtainedUser[0].role !== null && obtainedUser[0].role !== undefined ? obtainedUser[0].role : UserRole.USER;

          if (isUser) {
            console.log("User authenticated successfully");
            return {
              id: `${obtainedUser[0]!.id}`,
              email: obtainedUser[0]!.email,
              role: userRole,
              redirect: "/me",
            };
          } else {
            console.log("Incorrect password");
            return null;
          }
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      }
    })
  ],
 
   

});
