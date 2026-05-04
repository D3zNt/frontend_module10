"use client";

import { useEffect, useState } from "react";
import { getCart, removeFromCart, updateQuantity } from "@/lib/cart";
import { Navbar } from "@/components/navbar";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  const loadCart = () => {
    setCart(getCart());
  };

  useEffect(() => {
    loadCart();
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-24 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <h1 className="text-3xl font-bold mb-8 text-center">🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-slate-400">Cart is empty</p>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center"
              >
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-cyan-400">
                    Rp{item.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      updateQuantity(item.id, item.quantity - 1);
                      loadCart();
                      if (item.quantity <= 2) {
                        return removeFromCart(item.id);
                      }
                    }}
                    className="px-3 py-1 bg-red-500 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => {
                      updateQuantity(item.id, item.quantity + 1);
                      loadCart();
                    }}
                    className="px-3 py-1 bg-green-500 rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      loadCart();
                    }}
                    className="ml-4 text-red-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right text-xl font-bold mt-6">
              Total: Rp{total.toLocaleString()}
            </div>
          </div>
        )}
      </div>
    </>
  );
}