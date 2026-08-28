import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google
    ],
    secret: process.env.AUTH_SECRET,
    // Trust hosting forwarding headers on modern Vercel architecture
    trustHost: true,
    callbacks: {
        async authorized({ auth }) {
            // Logged-in users are authenticated, otherwise redirect to login page
            return !!auth
        },
        async signIn({ user }) {
            // Check if the user is an admin
            if (user.email === process.env.ADMIN_GOOGLE_EMAIL) {
                return true;
            } else {
                return '/auth/unauthorized';
            }
        },
    },
});
