import React from "react";
import Carousel from "../../ui/Carousel";
import p1 from "../../assets/carousel/p1.jpg";
import p2 from "../../assets/carousel/p2.jpg";
import p3 from "../../assets/carousel/p3.jpg";
import p4 from "../../assets/carousel/p4.jpg";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import Slider from "react-slick";
import ProductCard from "../Products/ProductCard";

// Ensure these imports for slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomePage() {
  const { products, isLoading, error } = useProducts({
    column: "category_id",
    equals: 2, // Assuming "2" corresponds to the "fytyra" category
  });

  const slides = [p1, p2, p3, p4];
  const navigate = useNavigate();

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show 4 products at a time
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <>
      <Carousel autoSlide={true}>
        {slides.map((s, index) => (
          <img src={s} key={index} alt={`slide-${index}`} />
        ))}
      </Carousel>

      <section className="my-10">
        <div className="flex items-center justify-center mx-5 bg-gray-50">
          <div className="w-full max-w-md px-6 py-8 text-center transition-all duration-300 transform bg-white rounded-lg shadow-md hover:scale-105 hover:shadow-lg">
            <h2 className="text-xl font-bold">Mirësevini në DIVA Cosmetics</h2>
            <Button
              className="mt-4 text-white bg-pink-800 border-pink-900 hover:border-pink-800 hover:bg-pink-700"
              onClick={() => navigate("/products")}
            >
              Shiko produktet
            </Button>
          </div>
        </div>
      </section>

      <section className="pl-3 mb-10">
        <h2 className="m-auto my-3 text-xl font-bold text-center">
          Produktet me te reja
        </h2>
        <div className="container ">
          {products.length > 0 ? (
            <Slider {...settings}>
              {products.map((product) => (
                <div key={product.id} className="p-2">
                  <ProductCard product={product} />
                </div>
              ))}
            </Slider>
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </section>
    </>
  );
}
