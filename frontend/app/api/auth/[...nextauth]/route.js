import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;

      // Fetch User's Location
      try {
        const res = await fetch("https://ipinfo.io/json?token=" + process.env.IPINFO_TOKEN);
        const data = await res.json();

        session.user.location = {
          city: data.city || null,
          region: data.region || null,
          country: data.country || null,
          lat: data.loc ? data.loc.split(",")[0] : null,
          lon: data.loc ? data.loc.split(",")[1] : null,
        };
      } catch (error) {
        console.error("Error fetching location:", error);
        session.user.location = null;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
