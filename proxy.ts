import { NextResponse} from "next/server";
import  type {NextRequest} from "next/server";

const PUBLIC_ROUTES = ['/login', '/register'];

function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp < Date.now() / 1000;
    } catch {
        return true;
    }
}

export function proxy(req: NextRequest) {
    const token = req.cookies.get('jwt')?.value;
    const  {pathname} = req.nextUrl;

    const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));

    if (token && isTokenExpired(token)) {
        const response = NextResponse.redirect(new URL('/login', req.url))
        response.cookies.delete('jwt')
        return response
    }

    if(!token && !isPublicRoute) {
        return NextResponse.redirect(new URL(`/login`, req.url));
    }

    if(token && isPublicRoute) {
        return NextResponse.redirect(new URL(`/trips`, req.url));
    }



    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}