import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/api/users/login`,
            {
              identifier: credentials?.identifier,
              password: credentials?.password,
            },
            { withCredentials: true }
          );

          const data = response?.data?.data;
          if (!data) return null;

          // Return a minimal user object; attach backend data to merge in jwt callback
          return {
            id: data?.user?._id || data?.user?.id || data?._id || data?.id || data?.userId || undefined,
            email: data?.user?.email || data?.email,
            name: data?.user?.fullName || data?.fullName || data?.name,
            image: data?.user?.profilePicture || data?.profilePicture || null,
            backendData: data,
          };
        } catch (error) {
          // Invalid credentials or server error
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  trustHost: true,
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          // Send user details to backend for saving in MongoDB
          const username = user.email.split('@')[0];
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/users/google-login`, {
            email: user.email,
            fullName: user.name,
            profilePicture: user.image,
            username,
          }, { 
            withCredentials: true 
          });

          user.backendData = response.data.data;
        } catch (error) {
          console.error("Error saving Google user:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // Merge user info when signing in
      if (user) {
        token.id = user.id || token.id;
        // Prefer token from backendData if present
        const backendToken = user.backendData?.token;
        if (backendToken) token.backendToken = backendToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (!session.user) session.user = {};
      session.user.id = token.id;
      session.backendToken = token.backendToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
