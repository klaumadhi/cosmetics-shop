import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/apiProducts";

export default function useProducts(
  { column, equals } = {},
  limit = 16,
  page = 1
) {
  const {
    data: products,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["products", { column, equals, limit, page }], // Include page in the queryKey
    queryFn: () => getProducts({ column, equals }, limit, page), // Pass limit and page to getProducts
    keepPreviousData: true, // Ensures smooth transition between pages
  });

  return { products, isLoading, error, isFetching };
}
