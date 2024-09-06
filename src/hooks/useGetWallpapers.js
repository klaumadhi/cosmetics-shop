import { useQuery } from "@tanstack/react-query";
import { getWallpapers } from "../services/apiWallpaper";

export default function useGetWallpapers(filterParams = {}, limit = null) {
  return useQuery({
    queryKey: ["wallpapers", filterParams, limit],
    queryFn: () => getWallpapers(filterParams, limit),
  });
}
