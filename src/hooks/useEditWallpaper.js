import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editWallpaper } from "../services/apiWallpaper";
import { toast } from "react-toastify";

export default function useEditWallpaper() {
  const queryClient = useQueryClient();

  const { mutate: updateWallpaper, isLoading: isEditing } = useMutation({
    mutationFn: ({ id, updatedWallpaper }) =>
      editWallpaper(id, updatedWallpaper),
    onSuccess: () => {
      toast.success("Wallpaper updated successfully");
      queryClient.invalidateQueries({ queryKey: ["wallpapers"] });
    },
    onError: (error) => {
      toast.error(`Error updating wallpaper: ${error.message}`);
    },
  });

  return { isEditing, updateWallpaper };
}
