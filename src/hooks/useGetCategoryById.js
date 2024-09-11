import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "../services/apiCategories"; // Assuming you have this function already

export default function useGetCategoryById({ id }) {
  const {
    data: categoryRow,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categoryRow", id],
    queryFn: () => getCategoryById({ id }),
    enabled: !!id, // Ensures the query only runs if 'id' is defined
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
