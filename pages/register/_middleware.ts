import { NextRequest, NextFetchEvent, NextResponse } from 'next/server'

export async function middleware(request: NextRequest, event: NextFetchEvent) {
   let guid: string
   let index: number

   const url = request.url

   // /register/<guid>
   if (url.length > '/register'.length) {
      index = url.lastIndexOf('/')
      guid = url.slice(index + 1)
   } else {
      // /register
      return undefined
   }

   const res = await fetch(`${process.env.BACKEND}invited?uniqueCode=${guid}`, {
      method: 'GET',
   })

   if (res.status !== 200) {
      return NextResponse.redirect('/register')
   }

   return undefined
}
