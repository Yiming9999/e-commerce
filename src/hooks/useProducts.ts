import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  stock: number;
  rating: number;
  description: string;
  discountPercentage: number;
  brand: string;
  category: string;
  thumbnail: string;
}

interface FetchProductsResponse {
  count: number;
  products: Product[];
}

const useProducts = (selectedCategory: string, searchText: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);

    let endpoint = "/products";
    const queryParams = new URLSearchParams();

    // Delete category after search
    if (searchText) {
      queryParams.append("q", searchText);
      endpoint += "/search?" + queryParams.toString();
      selectedCategory = "";
    } else if (selectedCategory) {
      endpoint += "/category/" + selectedCategory;
      searchText = "";
    }

    apiClient
      .get<FetchProductsResponse>(endpoint, { signal: controller.signal })
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [selectedCategory, searchText]);

  return { products, error, isLoading };
};

export default useProducts;
