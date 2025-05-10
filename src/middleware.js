import { NextResponse } from 'next/server';
import { decrypt } from '../src/auth/auth-db';
import { cookies } from 'next/headers';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard','/'];
const publicRoutes = ['/login', '/signup'];

export default async function middleware(req) {
  // 2. Check if the current route is protected or public 
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  console.log("%%%%%%",req.session);
  const cookie = req.cookies.get('JWT')?.value;
  // 3. Decrypt the session from the cookie
 // const cookie = await cookies().get('accessToken')?.value;
 // const session = await decrypt(cookie);

  // 4. Redirect
  if (isProtectedRoute && !req.session?.accessToken && !cookie) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
console.log("$$$$$444$$$$$$",req.nextUrl.pathname);
  if (
    isPublicRoute &&
    (req.session?.userId || cookie) &&
    !req.nextUrl.pathname.startsWith('/')
  ) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}