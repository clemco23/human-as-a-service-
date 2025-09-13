
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
  addToCart: (item: CartHumanItem) => { success: boolean; message: string };
  removeFromCart: (id: string, title?: string) => void;
  clearCart: () => void;
  getTotalPrice: () => { monthly: number; oneTime: number };
  isInCart: (id: string, title?: string) => boolean;
};

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState<CartHumanItem[]>(() => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartHumanItem) => {
    // Vérifier si l'utilisateur est connecté avant d'ajouter au panier
    if (!isAuthenticated) {
      navigate('/connect');
      return {
        success: false,
        message: "Vous devez être connecté pour ajouter des articles au panier"
      };
    }

    // Vérification plus précise : même ID ET même titre pour éviter les conflits
    const existingItem = cartItems.find(cartItem => 
      cartItem.id === item.id && cartItem.title === item.title
    );
    
    if (existingItem) {
      return {
        success: false,
        message: "Cet article est déjà dans votre panier"
      };
    }
    
    setCartItems(prev => [...prev, { ...item, quantity: 1 }]);
    return {
      success: true,
      message: "Article ajouté au panier avec succès"
    };
  };

  const removeFromCart = (id: string, title?: string) => {
    setCartItems(prev => {
      if (title) {
        // Suppression précise avec ID et titre
        const newItems = prev.filter(item => !(item.id === id && item.title === title));
        console.log('Suppression avec titre:', { id, title, avant: prev.length, après: newItems.length });
        return newItems;
      }
      // Suppression par ID seulement (fallback)
      const newItems = prev.filter(item => item.id !== id);
      console.log('Suppression par ID:', { id, avant: prev.length, après: newItems.length });
      return newItems;
    });
  };

  const isInCart = (id: string, title?: string) => {
    if (title) {
      // Vérification avec ID et titre pour plus de précision
      return cartItems.some(item => item.id === id && item.title === title);
    }
    return cartItems.some(item => item.id === id);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (totals, item) => {
        const itemTotal = item.price * (item.quantity || 1);
        if (item.isMonthly) {
          totals.monthly += itemTotal;
        } else {
          totals.oneTime += itemTotal;
        }
        return totals;
      },
      { monthly: 0, oneTime: 0 }
    );
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      getTotalPrice,
      isInCart 
    }}>
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