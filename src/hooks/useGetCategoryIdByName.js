import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/apiCategories";

export default function useGetCategoryIdByName() {
  const {
    data: categoryId,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categoryId"],
    queryFn: getCategories,
  });

  return { categoryId, isLoading, error };
}
