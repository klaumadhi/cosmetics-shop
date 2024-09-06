import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWallpaper } from "../services/apiWallpaper";
import { toast } from "react-toastify";

export default function useCreateWallpaper() {
  const queryClient = useQueryClient();

  const { mutate: createNewWallpaper, isPending: isCreating } = useMutation({
    mutationFn: createWallpaper,
    onSuccess: () => {
      toast.success("Wallpaper created successfully");
      queryClient.invalidateQueries({ queryKey: ["wallpapers"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isCreating, createNewWallpaper };
}
