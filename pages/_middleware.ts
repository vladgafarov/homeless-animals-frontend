import { NextRequest, NextFetchEvent, NextResponse } from 'next/server'

export async function middleware(request: NextRequest, event: NextFetchEvent) {
   const cookies = request.cookies
   const { pathname } = request.nextUrl

   let status: number

   if (cookies['.AspNetCore.Cookies']) {
      const response = await fetch(`${process.env.BACKEND}authorize`, {
         headers: {
            Cookie: `.AspNetCore.Cookies=${cookies['.AspNetCore.Cookies']}`,
         },
      })

      status = response.status
   }

   if (status === 200) {
      if (
         pathname === '/login' ||
         pathname.includes('/register') ||
         pathname === '/'
      ) {
         return NextResponse.redirect('/groups')
      }
      return undefined
   }

   return pathname === '/login' || pathname.includes('/register')
      ? undefined
      : NextResponse.redirect('/login')
}
