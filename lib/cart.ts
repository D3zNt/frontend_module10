export const getCart = () => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("cart") || "[]");
  };
  
  export const saveCart = (cart: any[]) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  
  export const addToCart = (item: any) => {
    const cart = getCart();
  
    const existing = cart.find((i: any) => i.id === item.id);
  
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
  
    saveCart(cart);
  };
  
  export const removeFromCart = (id: number) => {
    const cart = getCart().filter((i: any) => i.id !== id);
    saveCart(cart);
  };
  
  export const updateQuantity = (id: number, quantity: number) => {
    const cart = getCart().map((i: any) =>
      i.id === id ? { ...i, quantity } : i
    );
    saveCart(cart);
  };