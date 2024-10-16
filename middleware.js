import { NextResponse } from 'next/server';


export function middleware(req) {    
    const token = req.cookies.get('UTK');
    const isLoginPage = req.nextUrl.pathname === '/login';
    const isProfilePage = req.nextUrl.pathname.includes('profile')
    const isSubscriptionsPage = req.nextUrl.pathname.includes('subscriptions')
    const isPaymentPage = req.nextUrl.pathname.includes('payment')

    if (token && isLoginPage) {
        const redirectUrl = new URL('/', req.url);
        return NextResponse.redirect(redirectUrl);
    }

    if (!token && (isProfilePage || isSubscriptionsPage || isPaymentPage)) {
        const redirectUrl = new URL('/', req.url);
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}
