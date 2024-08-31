import { Link } from "react-router-dom";
import { formatNumber } from "../../utilis/helpers";

export default function ProductCard({ product, newProduct = false }) {
  const {
    id,
    brand,
    name,
    image,
    price: originalPrice,
    discount_percentage,
  } = product;

  // Calculate the current price based on the discount
  const currentPrice = Math.round(
    discount_percentage
      ? originalPrice - (originalPrice * discount_percentage) / 100
      : originalPrice
  );

  return (
    <Link to={`/product/${id}`}>
      <div className="mx-auto max-w-[300px] transform overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg">
        <div className="relative aspect-square">
          {/* Discount percentage circle */}
          {newProduct && (
            <div className="absolute z-10 flex items-center justify-center w-8 h-8 text-xs font-bold text-white bg-pink-500 rounded-full shadow-md top-2 left-2">
              New
            </div>
          )}
          {discount_percentage > 0 && (
            <div className="absolute z-10 flex items-center justify-center w-8 h-8 text-xs font-bold text-white bg-pink-500 rounded-full shadow-md top-2 left-2">
              -{discount_percentage}%
            </div>
          )}
          {/* Product image */}
          <img
            className="aspect-square w-fill"
            src={image}
            alt="Product Image"
          />
        </div>
        <div className="p-2">
          <p className="mb-1 text-xs text-gray-400 truncate-2-lines">{brand}</p>
          <h3 className="mb-1 font-medium text-gray-900 text-md truncate-2-lines">
            {name}
          </h3>

          <div className="flex items-center">
            <p
              className={`mr-2 text-lg font-semibold ${
                discount_percentage > 0 ? "text-red-600" : ""
              } text-gray-900`}
            >
              {formatNumber(currentPrice)}
              <span className="text-[15px]">L</span>
            </p>
            {discount_percentage > 0 && (
              <>
                <p className="text-base font-medium text-gray-500 line-through">
                  {formatNumber(originalPrice)}
                </p>
                <span className="text-[10px] no-underline">Leke</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
