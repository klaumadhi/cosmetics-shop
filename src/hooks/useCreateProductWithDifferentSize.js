import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createProductWithDifferentSize } from "../services/apiProducts";

export default function useCreateProductWithDifferentSize() {
  const queryClient = useQueryClient();

  const { mutate: createNewProductWithSizes, isPending: isCreating } =
    useMutation({
      mutationFn: async (productData) => {
        console.log("Calling API with data:", productData); // Debugging line to see what data is passed to API
        return createProductWithDifferentSize(productData);
      },
      onSuccess: () => {
        toast.success("Product created successfully!");
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
      onError: (error) => {
        console.error("API Error:", error); // Log the error to console for debugging
        toast.error("Failed to create product: " + error.message);
      },
    });

  return { isCreating, createNewProductWithSizes };
}
