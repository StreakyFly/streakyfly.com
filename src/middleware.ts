import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// secure server-side environment variable
const secretKey = process.env.SECRET_KEY;

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const key = url.searchParams.get('key');

    // if the key is not provided or isn't correct, redirect to the homepage
    if (key !== secretKey) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // if the key is correct, allow the request to continue
    return NextResponse.next();
}

// apply the middleware only to the admin route
export const config = {
    matcher: '/admin',
};
