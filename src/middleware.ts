export { auth as middleware } from '@/auth';

// TODO: If you later decide to use API routes outside the web app, you can secure them with
//  JWT tokens, so it's easier to manage the authentication and authorization of the API routes.
export const config = {
    matcher: ['/admin/:path*', '/api/:path*'],
    // matcher: '/admin/:path*',  // to temporarily disable API route auth
};
