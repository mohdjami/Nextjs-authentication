import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import { db } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

interface GoogleProfile {
  email: string;
  name?: string;
  email_verified: boolean;
  googleId?: string;
  sub: string;
  // other properties from Google profile...
}

interface User {
  id: string;
  username: string;
  email: string;
  // other properties from your User type...
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  // pages: {
  //   signIn: "/sign-in",
  // },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jami" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials || !(credentials.email || credentials.password)) {
            return null;
          }

          const existingUser = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!existingUser) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );

          if (!passwordMatch) {
            return null;
          }

          return {
            id: existingUser.id.toString(), // convert 'id' to string
            username: existingUser.username || "", // use 'username' from the user object, if it's null, return an empty string
            email: existingUser.email, // use 'email' from the user object
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile: GoogleProfile): Promise<User> {
        console.log("google profile", profile);

        if (!profile?.email) {
          throw new Error("No email found in the profile");
        }

        const user = await db.user.upsert({
          where: {
            googleID: profile.sub, // find the user by their Google ID
          },
          create: {
            email: profile.email,
            username: (profile.name as string) || "",
            password: "",
            googleID: profile.sub, // store the Google account's ID when creating a new user
          },
          update: {
            username: (profile.name as string) || "",
            googleID: profile.sub,
          },
        });
        if (profile.email_verified === true) {
          console.log("email verified");
          await db.user.update({
            where: {
              email: profile.email,
            },
            data: {
              emailVerified: new Date(),
            },
          });
        }
        console.log("user=", user.id, user.username, user.email);

        return {
          id: user.id,
          username: user.username as string,
          email: user.email,
        };
      },
    }),
  ],
};
