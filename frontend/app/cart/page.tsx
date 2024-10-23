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
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
// import router from 'next/router';
import { useRouter } from 'next/navigation';
  

interface Product {
  id: string;
  name: string;
  price: number;
}

// interface CartItem {
//   id: string;
//   product: Product;
//   quantity: number;
// }

// interface Cart {
//   id: string;
//   items: CartItem[];
// }

// export default function CartPage() {
//   const [cart, setCart] = useState<Cart | null>(null);
//   const userId = 'user-id-placeholder'; // Replace with actual user ID

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.get<Cart>(`/api/cart?userId=${userId}`);
//         setCart(response.data);
//       } catch (error) {
//         console.error('Error fetching cart:', error);
//       }
//     };
//     fetchCart();
//   }, []);

//   const calculateTotal = (): string => {
//     if (!cart || !cart.items) return '0.00';
//     return cart.items
//       .reduce((total, item) => total + item.product.price * item.quantity, 0)
//       .toFixed(2);
//   };

//   return (
//     <div>
//         <Navbar/>
//         <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
//       {cart && cart.items && cart.items.length > 0 ? (
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableCell>Product</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Quantity</TableCell>
//               <TableCell>Total</TableCell>
//             </TableRow>
//           </TableHeader>
//           <tbody>
//             {cart.items.map((item) => (
//               <TableRow key={item.id}>
//                 <TableCell>{item.product.name}</TableCell>
//                 <TableCell>${item.product.price.toFixed(2)}</TableCell>
//                 <TableCell>{item.quantity}</TableCell>
//                 <TableCell>${(item.product.price * item.quantity).toFixed(2)}</TableCell>
//               </TableRow>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <p className="text-gray-500">Your cart is empty</p>
//       )}
//       <div className="text-right mt-4">
//         <span className="font-semibold text-lg">Total: ${calculateTotal()}</span>
//       </div>
//       <Button className="mt-4">Checkout</Button>
//     </div>
//         <Footer/>
//     </div>
//   );
// }

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const fetchCart = async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/cart?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      const response = await fetch('/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId,
          quantity: newQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      fetchCart();
      toast.success('Cart updated');
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl">Please login to view your cart</p>
        <Button onClick={() => router.push('/signin')} className="mt-4">
          Login
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cart && cart.items && cart.items.length > 0 ? (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <tbody>
                {cart.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>${item.product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1"
                        >
                          -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1"
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => updateQuantity(item.id, 0)}
                        variant="destructive"
                        className="px-2 py-1"
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
            <div className="flex justify-between items-center mt-6">
              <div className="text-xl font-bold">
                Total: ${cart.items.reduce((total, item) => 
                  total + (item.product.price * item.quantity), 0).toFixed(2)}
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Button
              onClick={() => router.push('/products')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}