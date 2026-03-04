import { NextResponse} from "next/server";
import  type {NextRequest} from "next/server";

const PUBLIC_ROUTES = ['/login', '/register'];

export function proxy(req: NextRequest) {
    const token = req.cookies.get('jwt')?.value;
    const  {pathname} = req.nextUrl;

    const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));

    if(!token && !isPublicRoute) {
        return NextResponse.redirect(new URL(`/login`, req.url));
    }

    if(token && isPublicRoute) {
        return NextResponse.redirect(new URL(`/search-trip`, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}