import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { createProduct } from "../services/apiProducts";

export default function useCreateProduct() {
  const queryClient = useQueryClient();

  const { mutate: createNewProduct, isPending: isCreating } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product created");
      //Update the state of cabins so it rerenders with the new cabin
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isCreating, createNewProduct };
}
