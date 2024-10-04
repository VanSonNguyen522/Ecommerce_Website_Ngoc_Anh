import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Product = {
  id: string; // Hoặc `number` nếu bạn muốn sử dụng số
  name: string;
  description: string;
  price: number;
  oldPrice: number | null; // Giá cũ, có thể là null
  category: string; // Danh mục sản phẩm
  image: string | null; // Đường dẫn ảnh sản phẩm, có thể là null
  isNew: boolean | null; // Sản phẩm mới, có thể là null
  isOnSale: boolean | null; // Đang giảm giá, có thể là null
  status: string | null; // Cập nhật để cho phép giá trị null
  createdAt: Date; // Thời gian tạo sản phẩm
  updatedAt: Date; // Thời gian cập nhật sản phẩm
};

// Handle GET requests (Lấy danh sách sản phẩm cho homepage)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'all'; // Lấy status từ query string

    // Tạo điều kiện lọc sản phẩm theo status
    const whereConditions: any = {};

    if (status !== 'all') {
      whereConditions.status = status; // Sử dụng 'status' để lọc theo các trạng thái
    }

    // Lấy danh sách sản phẩm từ database
    const products: Product[] = await prisma.product.findMany({
      where: whereConditions,
    });

    // Nhóm sản phẩm theo status và giới hạn số lượng sản phẩm tối đa là 4 cho mỗi loại status
    const groupedProducts: Record<string, Product[]> = {};

    products.forEach(product => {
      const productStatus = product.status || 'unknown'; // Gán trạng thái mặc định nếu không có

      if (!groupedProducts[productStatus]) {
        groupedProducts[productStatus] = [];
      }

      if (groupedProducts[productStatus].length < 4) {
        groupedProducts[productStatus].push(product);
      }
    });

    // Chuyển đổi đối tượng nhóm thành mảng
    const limitedProducts = Object.values(groupedProducts).flat();

    return NextResponse.json(limitedProducts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}
