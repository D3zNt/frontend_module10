"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

interface Item {
  id: number;
  name: string;
  price: number;
  stock: number;
  created_at: string;
}

export default function ShopPage() {
  const router = useRouter();

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await api.get("/items");
      setItems(res.data.payload);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch items");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading shop...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-10">
      
      <div className="absolute w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl bottom-10 right-10"></div>

      <div className="relative max-w-7xl mx-auto">
        
        <h1 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
          🛒 Store
        </h1>

        {error && (
          <div className="mb-6 text-center text-red-400 bg-red-500/10 border border-red-500/20 py-3 rounded-lg">
            {error}
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center text-slate-400 text-lg">
            No items available
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
            {items.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-cyan-500/10 transition group"
              >
                <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition">
                  {item.name}
                </h2>

                <p className="text-lg font-bold text-cyan-400 mb-2">
                  Rp{item.price.toLocaleString()}
                </p>

                <p className="text-sm text-slate-400 mb-3">
                  Stock: <span className="text-white">{item.stock}</span>
                </p>

                <p className="text-xs text-slate-500 mb-4">
                  Added {new Date(item.created_at).toLocaleDateString()}
                </p>

                <button className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-400 text-slate-900 font-semibold hover:from-cyan-300 hover:to-purple-300 transition active:scale-95">
                  Buy
                </button>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}