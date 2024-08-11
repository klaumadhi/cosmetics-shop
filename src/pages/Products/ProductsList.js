import React from "react";
import ProductCard from "./ProductCard";
import useProducts from "../../hooks/useProducts.js";
import Spinner from "../../ui/Spinner.js";

export default function ProductList() {
  const { products, isLoading, error } = useProducts();
  console.log(products);

  const img =
    "https://marabika.lt/9156-medium_default/fragrance-world-safari-90ml.jpg";

  if (isLoading) {
    return <Spinner />;
  }

  console.log("Products in ProductList:", products);
  return (
    <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  mx-4">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
