// import { NextResponse,NextRequest } from 'next/server'
//  export { default } from "next-auth/middleware"
//  import { getToken } from 'next-auth/jwt'

// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
   
//     const token = await getToken({req:request})
//     const url = request.nextUrl

//     if(token && 
//         (
//             url.pathname.startsWith('/sign-in') ||
//             url.pathname.startsWith('/sign-up') ||
//             url.pathname.startsWith('/verify')  ||
//             url.pathname.startsWith('/')
//         )
//     ){
       
//      return NextResponse.redirect(new URL('/dashboard', request.url)) 
//     }

//     if(!token && url.pathname.startsWith('/dashboard')){
//      return NextResponse.redirect(new URL('/sign-in', request.url)) 
//     }

//   return NextResponse.redirect(new URL('/', request.url))
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     '/sign-in',
//     '/sign-up',
//     '/',
//     '/dashboard/:path*',
//     '/verify/:path*'
//   ],
// }
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const { pathname } = request.nextUrl;

    // Define protected and public routes
    const authRoutes = ['/sign-in', '/verify'];
    const protectedRoutes = ['/dashboard'];

    // If user is authenticated and tries to access auth routes, redirect to dashboard
    if (token && authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If user is NOT authenticated and tries to access protected routes, redirect to sign-in
    if (!token && protectedRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // Allow user to access public routes normally
    return NextResponse.next();
}

// Middleware will only run on specified routes
export const config = {
    matcher: ['/sign-in', '/sign-up', '/', '/dashboard/:path*', '/verify/:path*'],
};
