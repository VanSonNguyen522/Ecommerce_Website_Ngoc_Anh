"use client";

import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaTrash, FaBox, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';

interface UserCart {
  userId: string;
  userName: string;
  totalAmount: number;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    cartItemId: string;
  }[];
  isDelivered: boolean; // Thêm thuộc tính cho trạng thái giao hàng
}

const CartUserList = () => {
  const [userCarts, setUserCarts] = useState<UserCart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserCarts = async () => {
      try {
        const response = await fetch('/api/cart/dashboard');
        if (!response.ok) throw new Error('Failed to fetch carts');
        const data: UserCart[] = await response.json();
        setUserCarts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUserCarts();
  }, []);

  const handleDelete = async (cartItemId: string) => {
    try {
      const response = await fetch(`/api/cart/dashboard/id=${cartItemId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to delete cart item');

      setUserCarts((prevCarts) =>
        prevCarts.map((cart) => ({
          ...cart,
          items: cart.items.filter((item) => item.cartItemId !== cartItemId),
        }))
      );

      toast.success('Cart item deleted successfully');
    } catch (error) {
      console.error('Error deleting cart item:', error);
      toast.error('Failed to delete cart item');
    }
  };

  const handleDeliveryStatus = async (cartId: string, isDelivered: boolean) => {
    try {
      const response = await fetch(`/api/cart/dashboard/id=${cartId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliveryStatus: isDelivered }),
      });

      if (!response.ok) throw new Error('Failed to update delivery status');

      setUserCarts((prevCarts) =>
        prevCarts.map((cart) =>
          cart.userId === cartId ? { ...cart, isDelivered } : cart
        )
      );

      toast.success('Delivery status updated successfully');
    } catch (error) {
      console.error('Error updating delivery status:', error);
      toast.error('Failed to update delivery status');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800">Cart Management Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage user carts and delivery status</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Total</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Items</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userCarts.map((cart) => (
                <tr key={cart.userId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 font-medium">
                          {cart.userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{cart.userName}</div>
                        <div className="text-gray-500 text-sm">{cart.userId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900 font-medium">
                      {new Intl.NumberFormat('vi-VN', { 
                        style: 'currency', 
                        currency: 'VND' 
                      }).format(cart.totalAmount)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      {cart.items.map(item => (
                        <div key={item.productId} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                          <div className="flex items-center">
                            <FaBox className="text-gray-400 mr-2" />
                            <span className="text-gray-700">{item.productName}</span>
                            <span className="ml-2 text-gray-500">×{item.quantity}</span>
                          </div>
                          <button
                            onClick={() => handleDelete(item.cartItemId)}
                            className="text-red-500 hover:text-red-700 transition-colors p-1"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDeliveryStatus(cart.userId, true)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                      >
                        <FaCheckCircle className="mr-2" />
                        Delivered
                      </button>
                      <button
                        onClick={() => handleDeliveryStatus(cart.userId, false)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
                      >
                        <FaTimesCircle className="mr-2" />
                        Pending
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CartUserList;