import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/apiProducts";

export default function useProducts({ column, equals } = {}) {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", { column, equals }], // Include column and equals in the queryKey
    queryFn: () => getProducts({ column, equals }), // Pass column and equals to getProducts
  });

  if (error) {
    console.error("Error in useProducts hook:", error);
  }

  return { products, isLoading, error };
}
