import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // Prisma 호출 제거
  // 대신 API 라우트로 요청 전달
  // const response = await fetch('/api/check-auth', {
  //   headers: {
  //     cookie: req.headers.get('cookie') || '',
  //   },
  // });
  //
  // if (response.status === 401) {
  //   return NextResponse.redirect('/login');
  // }

  return NextResponse.next();
}
