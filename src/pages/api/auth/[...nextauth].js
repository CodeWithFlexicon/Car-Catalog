import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { pool } from "../../../config/configPg";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password) {
          throw new Error("Missing credentials");
        }

        const { username, password } = credentials;

        try {
          const query = `
            SELECT * FROM users 
            WHERE username = $1 OR email = $1
          `;
          const userResult = await pool.query(query, [username]);

          if (userResult.rows.length === 0) {
            throw new Error("User or email does not exist");
          }

          const user = userResult.rows[0];
          const isValid = await bcrypt.compare(password, user.password_hash);

          if (!isValid) {
            throw new Error("Wrong password");
          }

          return {
            id: user.user_id,
            name: user.username,
            email: user.email,
            profile_imageurl: user.profile_imageurl,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error(error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.profile_imageurl = user.profile_imageurl;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.profile_imageurl = token.profile_imageurl;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

export default NextAuth(authOptions);
