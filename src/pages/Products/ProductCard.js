export default function ProductCard({ product }) {
  const {
    id,
    brand,
    name,
    image,
    price: originalPrice,
    discount_percentage,
  } = product;
  const currentPrice = discount_percentage
    ? originalPrice - (originalPrice * discount_percentage) / 100
    : originalPrice;
  const img =
    "https://marabika.lt/9156-medium_default/fragrance-world-safari-90ml.jpg";

  return (
    <div className="mx-auto  mt-11 max-w-[300px] transform overflow-hidden rounded-lg bg-white :bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
      <div className="relative w-[200px] h-[200px]">
        <img
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={image}
          alt="Product Image"
        />
      </div>
      <div className="p-2">
        <p className="mb-1  text-xs  text-gray-400">
          {brand.length >= 26 ? brand.slice(0, 26) + "..." : brand}
        </p>
        <h2 className="mb-1 text-md font-medium  text-gray-900">
          {name.length >= 18 ? name.slice(0, 19) + "..." : name}
        </h2>

        <div className="flex items-center">
          <p className="mr-2 text-lg font-semibold text-gray-900">
            {currentPrice} leke
          </p>
          {discount_percentage && (
            <>
              <p className="text-base font-medium text-gray-500 line-through ">
                {originalPrice}All
              </p>

              <p className="ml-auto text-base font-medium text-pink-400">
                -{discount_percentage}%
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
