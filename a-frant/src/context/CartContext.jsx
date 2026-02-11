import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (newItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item._id === newItem._id
      );

      if (existingIndex >= 0) {
        const updatedCart = [...prevCart];
        const existingItem = updatedCart[existingIndex];

        const totalQty = existingItem.quantity + newItem.quantity;
        if (newItem.stock && totalQty > newItem.stock) {
          alert("Not enough stock available");
          return prevCart;
        }

        updatedCart[existingIndex].quantity = totalQty;
        return updatedCart;
      } else {
        if (newItem.stock && newItem.quantity > newItem.stock) {
          alert("Not enough stock available");
          return prevCart;
        }
        return [...prevCart, newItem];
      }
    });
  };

  const updateQuantity = (productId, newQty, stock) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity:
                newQty > stock ? stock : newQty < 1 ? 1 : newQty,
            }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
