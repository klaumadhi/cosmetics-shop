import { useQuery } from "@tanstack/react-query";
import { getVariationsFromProductId } from "../services/apiProductVariations";

export default function useGetVariationsFromProductId(id) {
  const {
    data: product_variations,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["productVariations", id],
    queryFn: async () => {
      const variations = await getVariationsFromProductId(id);

      // Sorting logic: only if variations exist and no color_image
      if (variations && variations.length > 0 && !variations[0]?.color_image) {
        return variations.sort((a, b) => {
          const valueA = parseFloat(a.value);
          const valueB = parseFloat(b.value);

          // Handle potential non-numeric values safely
          if (isNaN(valueA) || isNaN(valueB)) {
            return 0;
          }
          return valueA - valueB;
        });
      }
      return variations;
    },
    enabled: !!id, // Run only when id is defined
    retry: 2, // Retry twice on failure
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });

  return { product_variations, isLoading, error, isFetching };
}
