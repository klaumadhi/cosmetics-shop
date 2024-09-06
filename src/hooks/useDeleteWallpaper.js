import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWallpaper } from "../services/apiWallpaper";
import { toast } from "react-toastify";

export default function useDeleteWallpaper() {
  const queryClient = useQueryClient();

  const { mutate: removeWallpaper, isPending: isDeleting } = useMutation({
    mutationFn: deleteWallpaper,
    onSuccess: () => {
      toast.success("Wallpaper deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["wallpapers"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isDeleting, removeWallpaper };
}
