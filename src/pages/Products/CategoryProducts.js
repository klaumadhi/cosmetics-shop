import { useParams } from "react-router-dom";

const CategoryProducts = () => {
  const { category } = useParams();

  // Fetch and display products based on the category
  return (
    <div>
      <h1>Products in category: {category}</h1>
      {/* Display the list of products for the given category */}
    </div>
  );
};

export default CategoryProducts;
