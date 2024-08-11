import React from "react";
import useProducts from "../../hooks/useProducts";
import CreateProductForm from "../Products/CreateProductForm";

export default function Admin() {
  const { products, isLoading, error } = useProducts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products.</div>;
  }

  return <CreateProductForm />;
}
