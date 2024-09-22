"use client";

import DashboardLayout from '@/app/dashboard/DashboardLayout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Sử dụng từ next/navigation
import { useEffect } from 'react';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // useEffect luôn chạy, không thay đổi số lượng hook giữa các render
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/'); // Điều hướng về trang chủ nếu không phải admin
    }
  }, [status, session, router]);

  // Trả về Loading nếu đang chờ xác thực
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Nếu không đăng nhập, điều hướng về trang đăng nhập
  if (status === 'unauthenticated') {
    router.push('/signin'); // Hoặc đường dẫn khác phù hợp
    return null; // Dừng render khi điều hướng
  }

  // Render Dashboard chỉ khi là admin
  if (session?.user?.role === 'admin') {
    return (
      <DashboardLayout>
        <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Widget: Sản phẩm */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Sản phẩm</h2>
            <p className="mt-2 text-gray-600">Quản lý và theo dõi thông tin sản phẩm của bạn.</p>
          </div>

          {/* Widget: Người dùng */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Người dùng</h2>
            <p className="mt-2 text-gray-600">Quản lý tài khoản và hoạt động của người dùng.</p>
          </div>

          {/* Widget: Giỏ hàng */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Giỏ hàng</h2>
            <p className="mt-2 text-gray-600">Xem các mặt hàng trong giỏ hàng của khách hàng.</p>
          </div>

          {/* Widget: Hoá đơn */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Hoá đơn</h2>
            <p className="mt-2 text-gray-600">Theo dõi và quản lý hoá đơn của bạn.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Nếu không phải admin, trả về null (vì useEffect sẽ redirect)
  return null;
};

export default Dashboard;
