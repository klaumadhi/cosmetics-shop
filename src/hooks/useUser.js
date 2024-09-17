import React from "react";
import { getCurrentUser } from "../services/apiAdmin";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
};
