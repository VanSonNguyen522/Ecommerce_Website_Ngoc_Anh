// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get('token');

//   const url = req.nextUrl.clone();

// //   if (!token) {
// //     url.pathname = '/signin'; // Điều hướng về trang đăng nhập nếu không có token
// //     return NextResponse.redirect(url);
// //   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/dashboard/:path*'], // Bảo vệ tất cả các route bắt đầu bằng /dashboard
// };
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server'; // Import kiểu dữ liệu NextRequest

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const url = req.nextUrl.clone();

  // Nếu không có token thì redirect về trang đăng nhập
  if (!token) {
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }

  // Nếu role không phải là admin thì redirect về trang chủ
  if (token.role !== 'admin') {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // Bảo vệ tất cả các route bắt đầu bằng /dashboard
};

