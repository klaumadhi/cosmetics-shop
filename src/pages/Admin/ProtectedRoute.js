import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import Spinner from "../../ui/Spinner";

export default function ProtectedRoute({ element }) {
  //1. Load the auth user
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  //If is no authenticated user redirect to login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login", { replace: true });
      }
    },
    [isAuthenticated, isLoading]
  );

  if (isLoading) <Spinner />;

  if (isAuthenticated) return element;
}
