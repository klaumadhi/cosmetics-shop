import { useQuery } from "@tanstack/react-query";
import { getCategoryIdByName } from "../services/apiCategories";

export default function useGetCategoryIdByName({ name }) {
  const {
    data: categoryRow,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categoryRow", name],
    queryFn: () => getCategoryIdByName({ name }),
    enabled: !!name, // Ensures the query only runs if 'name' is defined
    retry: 2, // Retry a couple of times on failure
    refetchOnWindowFocus: false, // Disable refetch on window focus by default
  });

  console.log(categoryRow);

  // Optionally, display error in a user-friendly way
  if (error) {
    console.error("Error fetching categoryRow:", error);
    // You can add a toast or alert here to notify the user
  }

  return { categoryRow, isLoading, error };
}
