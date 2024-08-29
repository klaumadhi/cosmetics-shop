import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createProductWithDifferentColors } from "../services/apiProducts";

export default function useCreateProductWithDifferentColors() {
  const queryClient = useQueryClient();

  const { mutate: createNewProductWithColors, isPending: isCreating } =
    useMutation({
      mutationFn: async (productData) => {
        console.log("Calling API with data:", productData); // Debugging line to see what data is passed to API
        return createProductWithDifferentColors(productData);
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

  return { isCreating, createNewProductWithColors };
}
