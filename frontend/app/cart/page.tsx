"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    TableCell,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
  

interface Product {
  id: string;
  name: string;
  price: number;
}

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface Cart {
  id: string;
  items: CartItem[];
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const userId = 'user-id-placeholder'; // Replace with actual user ID

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get<Cart>(`/api/cart?userId=${userId}`);
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);

  const calculateTotal = (): string => {
    if (!cart || !cart.items) return '0.00';
    return cart.items
      .reduce((total, item) => total + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div>
        <Navbar/>
        <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart && cart.items && cart.items.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHeader>
          <tbody>
            {cart.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>${item.product.price.toFixed(2)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${(item.product.price * item.quantity).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-gray-500">Your cart is empty</p>
      )}
      <div className="text-right mt-4">
        <span className="font-semibold text-lg">Total: ${calculateTotal()}</span>
      </div>
      <Button className="mt-4">Checkout</Button>
    </div>
        <Footer/>
    </div>
  );
}
