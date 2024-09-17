import { useQuery } from "@tanstack/react-query";
import { searchProductsByName } from "../services/apiProducts";

export default function useSearchProductsByName(name) {
  const {
    data: searchProducts,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["searchName", name],
    queryFn: () => searchProductsByName(name), // Pass 'name' directly
    enabled: !!name, // Ensure the query only runs if 'name' is defined
    retry: 2, // Retry a couple of times on failure
    refetchOnWindowFocus: false, // Disable refetch on window focus by default
  });

  // console.log(searchProducts);

  // Optionally, display error in a user-friendly way
  if (error) {
    console.error("Error fetching products:", error);
    // You can add a toast or alert here to notify the user
  }

  return { searchProducts, isLoading, error, isFetching };
}
