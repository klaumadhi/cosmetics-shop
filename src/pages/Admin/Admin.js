import React from "react";

import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  return (
    <>
      <Button
        className="mx-auto mt-20"
        onClick={() => navigate("createProduct")}
      >
        Create Simple Product
      </Button>
      <Button
        className="mx-auto mt-20"
        onClick={() => navigate("CreateProductWithSizesForm")}
      >
        Create Products with different sizes
      </Button>
      <Button
        className="mx-auto mt-20"
        onClick={() => navigate("CreateProductWithColorsForm")}
      >
        Create Products with different colors
      </Button>
    </>
  );
}
