import { useQuery } from "@tanstack/react-query";
import { getProductsByCategoryId } from "../services/apiProducts";

export default function useGetProductsByCategoryId(categoryId, page = 1) {
  const {
    data: products,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["productsByCategory", { categoryId, page }], // Query key includes categoryId and page
    queryFn: () => getProductsByCategoryId(categoryId, page), // Fetch products by category ID and page
    keepPreviousData: true, // Ensures smooth transition between pages
    enabled: !!categoryId, // Only run the query if categoryId is truthy
  });

  return { products, isLoading, error, isFetching };
}
