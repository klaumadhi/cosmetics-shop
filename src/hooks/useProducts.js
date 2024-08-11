import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/apiProducts";

export default function useProducts() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (error) {
    console.error("Error in useProducts hook:", error);
  }

  return { products, isLoading, error };
}
