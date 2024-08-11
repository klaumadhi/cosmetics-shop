export default function ProductCard({ product }) {
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

  // Image URL (can be replaced with actual image from `product`)
  const img =
    "https://marabika.lt/9156-medium_default/fragrance-world-safari-90ml.jpg";

  return (
    <div className="mx-auto mt-11 max-w-[300px] transform overflow-hidden rounded-lg bg-white :bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
      <div className="relative pb-[100%] w-[200px] h-[200px] xs:max-w-[140px] xs:h-[130px] ">
        {/* Discount percentage circle */}
        {discount_percentage && (
          <div className="absolute z-10 top-2 left-2 flex items-center justify-center h-8 w-8 bg-pink-500 text-white text-xs font-bold rounded-full shadow-md">
            -{discount_percentage}%
          </div>
        )}
        {/* Product image */}
        <img
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={image}
          alt="Product Image"
        />
      </div>
      <div className="p-2">
        <p className="mb-1 text-xs text-gray-400">
          {brand.length >= 26 ? brand.slice(0, 26) + "..." : brand}
        </p>
        <h3 className="mb-1 text-md font-medium text-gray-900">
          {name.length >= 18 ? name.slice(0, 17) + "..." : name}
        </h3>

        <div className="flex items-center">
          <p
            className={`mr-2 text-lg font-semibold ${
              discount_percentage ? "text-red-600" : ""
            } text-gray-900`}
          >
            {currentPrice}
            <span className="text-[15px]">Leke</span>
          </p>
          {discount_percentage && (
            <>
              <p className="text-base font-medium text-gray-500 line-through">
                {originalPrice}
              </p>
              <span className="text-[10px] no-underline">Leke</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
