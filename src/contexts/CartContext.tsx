
type CartHumanItem = {
  id: string;
  title: string;
  image?: string;
  age: number;
  genre: string;
  size: number;
  personality: string;
  price: number;
  isMonthly: boolean;
  quantity?: number;
};

type CartContextType = {
  cartItems: CartHumanItem[];
  addToCart: (item: CartHumanItem) => void;
  removeFromCart: (id: string) => void;
};

import React, { createContext, useContext, useState, useEffect } from "react";


const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartHumanItem[]>(() => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartHumanItem) => {
    setCartItems(prev => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook d'utilisation du contexte
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart doit être utilisé dans CartProvider");
  return context;
};