import { useQuery } from "@tanstack/react-query";
import { getVariationsFromProductId } from "../services/apiProductVariations";

export default function useGetVariationsFromProductId(id) {
  const {
    data: product_variations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["productVariations", id], // More descriptive key
    queryFn: () => getVariationsFromProductId(id),
    enabled: !!id, // Ensure the query only runs if id is defined
    retry: 2, // Retry a couple of times on failure
    refetchOnWindowFocus: false, // Disable refetch on window focus by default
  });

  return { product_variations, isLoading, error };
}
