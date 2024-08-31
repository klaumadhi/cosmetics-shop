import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/apiProducts";

export default function useProducts({ column, equals } = {}, limit = null) {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", { column, equals, limit }], // Include column and equals in the queryKey
    queryFn: () => getProducts({ column, equals }, limit), // Pass column and equals to getProducts
  });

  console.log(limit);
  if (error) {
    console.error("Error in useProducts hook:", error);
  }

  return { products, isLoading, error };
}
