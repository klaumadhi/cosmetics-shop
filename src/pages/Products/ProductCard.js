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

  return (
    <div className="mx-auto  max-w-[300px] transform overflow-hidden rounded-lg bg-white :bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
      <div className="relative aspect-square">
        {/* Discount percentage circle */}
        {discount_percentage > 0 && (
          <div className="absolute z-10 flex items-center justify-center w-8 h-8 text-xs font-bold text-white bg-pink-500 rounded-full shadow-md top-2 left-2">
            -{discount_percentage}%
          </div>
        )}
        {/*Product image */}
        <img
          className=" aspect-square w-fill"
          src={image}
          alt="Product Image"
        />
      </div>
      <div className="p-2">
        <p className="mb-1 text-xs text-gray-400">
          {brand.length >= 26 ? brand.slice(0, 26) + "..." : brand}
        </p>
        <h3 className="mb-1 font-medium text-gray-900 text-md">
          {name.length >= 17 ? name.slice(0, 14) + "..." : name}
        </h3>

        <div className="flex items-center">
          <p
            className={`mr-2 text-lg font-semibold ${
              discount_percentage > 0 ? "text-red-600" : ""
            } text-gray-900`}
          >
            {currentPrice}
            <span className="text-[15px]">Leke</span>
          </p>
          {discount_percentage > 0 && (
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
