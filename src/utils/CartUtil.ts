import { CartItem } from "../components/ShoppingCart";
import { Dispatch, SetStateAction } from "react";
import { Product } from "../hooks/useProducts";

export const addToCart = (productToAdd: Product, setItems: Dispatch<SetStateAction<CartItem[]>>) => {
    setItems((prevItems) => {
      const foundIndex = prevItems.findIndex(
        (item) => item.id === productToAdd.id
      );
      if (foundIndex >= 0) {
        return prevItems.map((item, index) =>
          index === foundIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        const newItem = { ...productToAdd, quantity: 1 };
        return [...prevItems, newItem];
      }
    });
  };

  export const handleDeleteItem = (id: number, setItems: Dispatch<SetStateAction<CartItem[]>>) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  export const onAdd = (productId: number, setItems: Dispatch<SetStateAction<CartItem[]>>) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  export const onRemove = (productId: number, setItems: Dispatch<SetStateAction<CartItem[]>>) => {
    setItems((prevItems) => {
      const foundItem = prevItems.find((item) => item.id === productId);
      if (foundItem && foundItem.quantity === 1) {
        return prevItems.filter((item) => item.id !== productId);
      } else {
        return prevItems.map((item) => {
          if (item.id === productId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      }
    });
  };