import { useCallback, useEffect, useState } from "react";
import { CartInformation, CartItem } from "../components/ShoppingCart";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

const useCarts = () => {
  const [cartInfo, setCartInfo] = useState<CartInformation>({
    items: [],
    total: 0,
    discountedTotal: 0,
    userId: 0,
    totalProducts: 0,
    totalQuantity: 0,
    id: 0,
    onDelete: async () => {},
    onAdd: async () => {},
    onRemove: async () => {},
  });
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    console.log(cartInfo);
  }, [cartInfo]);

  // Add a product from product card
  const addToCart = useCallback(
    async (userId: number, product: CartItem) => {
      setLoading(true);

      let updatedItems = [...cartInfo.items];
      const existingProductIndex = updatedItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        const existingItem = updatedItems[existingProductIndex];
        updatedItems[existingProductIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + product.quantity,
        };
      } else {
        updatedItems.push(product);
      }

      try {
        const response = await apiClient.post("/carts/add", {
          userId,
          products: updatedItems,
        });
        console.log(response.data);
        setCartInfo((prev) => ({
          ...prev,
          items: response.data.products,
          total: response.data.total,
          discountedTotal: response.data.discountedTotal,
          totalProducts: response.data.totalProducts,
          totalQuantity: response.data.totalQuantity,
          id: response.data.id,
        }));
      } catch (error) {
        if (error instanceof CanceledError) return;
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
    [cartInfo.items, cartInfo.totalQuantity]
  );

  // Add one quantity of a product from cart
  const addOne = useCallback(
    async (userId: number, product: CartItem) => {
      setLoading(true);

      let updatedItems = [...cartInfo.items];
      const existingProductIndex = updatedItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        const existingItem = updatedItems[existingProductIndex];
        updatedItems[existingProductIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
      } else {
        updatedItems.push(product);
      }

      try {
        const response = await apiClient.post("/carts/add", {
          userId,
          products: updatedItems,
        });
        console.log(response.data);
        setCartInfo((prev) => ({
          ...prev,
          items: response.data.products,
          total: response.data.total,
          discountedTotal: response.data.discountedTotal,
          totalProducts: response.data.totalProducts,
          totalQuantity: response.data.totalQuantity,
          id: response.data.id,
        }));
      } catch (error) {
        if (error instanceof CanceledError) return;
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
    [cartInfo.items, cartInfo.totalQuantity]
  );

  // Remove one quantity of a product from cart
  const removeOne = useCallback(
    async (userId: number, product: CartItem) => {
      setLoading(true);

      let updatedItems = [...cartInfo.items];
      const existingProductIndex = updatedItems.findIndex(
        (item) => item.id === product.id
      );

      const existingItem = updatedItems[existingProductIndex];
      if (existingItem.quantity === 1) {
        updatedItems = updatedItems.filter((item) => item.id !== product.id);
      } else {
        updatedItems[existingProductIndex] = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
      }

      if (updatedItems.length === 0) {
        updatedItems = [
          {
            id: 0,
            quantity: 0,
            price: 0,
            title: "",
            discountPercentage: 0,
            images: [""],
            stock: 0,
            rating: 0,
            description: "",
            brand: "",
            category: "",
            thumbnail: "",
          },
        ];
      }

      try {
        const response = await apiClient.post("/carts/add", {
          userId,
          products: updatedItems,
        });
        console.log(response.data);
        setCartInfo((prev) => ({
          ...prev,
          items: response.data.products,
          total: response.data.total,
          discountedTotal: response.data.discountedTotal,
          totalProducts: response.data.totalProducts,
          totalQuantity: response.data.totalQuantity,
          id: response.data.id,
        }));
      } catch (error) {
        if (error instanceof CanceledError) return;
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
    [cartInfo.items, cartInfo.totalQuantity]
  );

  // Delete a product from cart
  const deleteItem = useCallback(
    async (userId: number, productId: number) => {
      setLoading(true);

      // Clone the current cart items and find the product to "delete" by setting its quantity to 0
      let itemsWithoutDeleted = cartInfo.items.filter(
        (item) => item.id !== productId
      );
      if (itemsWithoutDeleted.length === 0) {
        itemsWithoutDeleted = [
          {
            id: 0,
            quantity: 0,
            price: 0,
            title: "",
            discountPercentage: 0,
            images: [""],
            stock: 0,
            rating: 0,
            description: "",
            brand: "",
            category: "",
            thumbnail: "",
          },
        ];
      }

      try {
        const response = await apiClient.post("/carts/add", {
          userId,
          products: itemsWithoutDeleted,
        });

        setCartInfo((prev) => ({
          ...prev,
          items: response.data.products,
          total: response.data.total,
          discountedTotal: response.data.discountedTotal,
          totalProducts: response.data.totalProducts,
          totalQuantity: response.data.totalQuantity,
          id: response.data.id,
        }));
      } catch (error) {
        if (error instanceof CanceledError) return;
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
    [cartInfo.items, cartInfo.totalQuantity]
  );

  return {
    cartInfo,
    addToCart,
    deleteItem,
    addOne,
    removeOne,
    error,
    isLoading,
  };
};

export default useCarts;
