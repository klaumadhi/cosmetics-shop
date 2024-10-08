import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../Products/ProductCard";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import DivaInside from "../../assets/images/diva-inside.jpg";
import useCategories from "../../hooks/useCategories";

// Import Slick Carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useGetWallpapers from "../../hooks/useGetWallpapers";

export default function HomePage() {
  const { products, isLoading, error } = useProducts({}, 6);
  const { categories = [] } = useCategories();
  const navigate = useNavigate();

  const { data: wallpapers, isLoading2, error2 } = useGetWallpapers();

  // Slider settings for product carousel
  const productSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  // Slider settings for hero carousel
  const heroSliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3, // Show 4 slides on large screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // Tablets and smaller screens
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Mobile devices in landscape mode
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Small mobile devices in portrait mode
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (isLoading || isLoading2) return <Spinner />;
  if (error || error2) return <p>Error loading products: {error.message}</p>;

  return (
    <>
      {/* Hero Carousel */}
      <div className="overflow-hidden slider-container">
        <Slider {...heroSliderSettings}>
          {wallpapers?.map((slide, index) => (
            <Link to={slide.product_link} key={slide.id}>
              <img
                src={slide.product_image}
                alt={`slide-${slide.product_name}`}
                className="object-cover w-full h-96"
              />
            </Link>
          ))}
        </Slider>
      </div>

      {/* Welcome Section
      <section className="my-10">
        <div className="flex items-center justify-center mx-5 bg-white rounded-lg shadow-md">
          <div className="w-full max-w-lg px-8 py-12 text-center transition-all duration-300 transform rounded-lg hover:scale-105">
            <h2 className="text-3xl font-bold text-pink-600">
              Welcome to DIVA Cosmetics
            </h2>
            <p className="mt-4 leading-relaxed text-gray-700">
              Unlock Your Beauty with DIVA – Discover the Latest in Luxury
              Cosmetics.
            </p>
            <Button
              className="px-8 py-3 mt-6 text-lg font-semibold text-white transition-transform transform rounded-full bg-gradient-to-r from-pink-500 to-pink-700 hover:scale-110"
              onClick={() => navigate("/products")}
            >
              Shop Now
            </Button>
            <p className="mt-3 text-sm text-gray-500">
              Explore our newest collection and special offers!
            </p>
          </div>
        </div>
      </section> */}

      {/* Latest Products Section */}
      <section className="pb-6 mt-2 mb-8">
        <h2 className="my-6 text-3xl font-bold text-center">New Arrivals</h2>
        <div className="mx-auto overflow-hidden ">
          {products.length > 0 ? (
            <Slider {...productSliderSettings}>
              {products.map((product) => (
                <div key={product.id} className="p-3">
                  <ProductCard product={product} newProduct={true} />
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-center">No products found.</p>
          )}
        </div>
      </section>

      {/* Hero Section with Background */}
      <div className="relative flex items-center justify-center text-white h-96">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url(${DivaInside})`,
            filter: "blur(1px)",
            zIndex: -1,
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50 z-1"></div>
        <div className="relative text-center z-2">
          <h1 className="mb-4 text-5xl font-bold">Discover Your Beauty</h1>
          <p className="mb-8 text-lg">
            Unveil the latest trends and products in the world of beauty
          </p>
          <Button
            className="px-6 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-pink-500 to-pink-700 hover:scale-105"
            onClick={() => navigate("/products")}
          >
            Explore Now
          </Button>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-16 bg-gray-100">
        <div className="container px-3 mx-auto text-center">
          <h2 className="mb-8 text-3xl font-bold">Our Categories</h2>
          <div className="grid grid-cols-2 gap-6">
            {categories?.data?.map((category, index) => {
              const isFirst = index === 0;
              const isLast = index === categories.data.length - 1;
              const isEven = categories.data.length % 2 === 0;

              return (
                <div
                  key={category.id}
                  className={`relative cursor-pointer group ${
                    isFirst ? "row-span-2" : ""
                  } ${isLast && isEven ? "col-span-2" : ""}`}
                  onClick={() => navigate(`/products/${category.name}`)}
                >
                  <img
                    src={category.image} // Placeholder path for category image
                    alt={category.description}
                    className={`object-cover w-full rounded-lg shadow-md ${
                      isFirst ? "h-[26rem]" : isLast && isEven ? "h-48" : "h-48"
                    } ${isLast && isEven ? "w-full" : ""}`}
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 bg-black rounded-lg opacity-30 group-hover:opacity-40"></div>
                  <h3 className="absolute bottom-0 w-full pb-4 text-lg font-semibold text-white uppercase">
                    {category.description}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-white">
        <div className="container px-6 mx-auto text-center">
          <h2 className="text-3xl font-bold text-pink-600">
            About DIVA Cosmetics
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            At DIVA Cosmetics, we believe in empowering individuals to express
            their beauty. From skincare to makeup, our curated selection of
            products is designed to cater to every unique need.
          </p>
          <Button
            className="px-6 py-3 mt-6 text-lg font-semibold rounded-full bg-gradient-to-r from-pink-500 to-pink-700 hover:scale-105"
            onClick={() => navigate("/about")}
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="container px-6 mx-auto text-center">
          <h2 className="text-3xl font-bold">What Our Customers Say</h2>
          <div className="grid grid-cols-1 gap-8 mt-10 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="italic text-gray-600">
                "DIVA Cosmetics has completely transformed my skincare routine.
                I love their products!"
              </p>
              <h4 className="mt-4 font-bold text-gray-700">— Emily R.</h4>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="italic text-gray-600">
                "The makeup selection is top-notch. I always find something
                new!"
              </p>
              <h4 className="mt-4 font-bold text-gray-700">— Sarah L.</h4>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="italic text-gray-600">
                "I can't imagine going anywhere else for my beauty products.
                Highly recommended!"
              </p>
              <h4 className="mt-4 font-bold text-gray-700">— Megan K.</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
