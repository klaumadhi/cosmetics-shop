import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAdmin } from "../services/apiAdmin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAdmin({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user", user.user]);
      navigate("/admin");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Provided email or password is incorrect");
    },
  });

  return { login, isLoading };
}
