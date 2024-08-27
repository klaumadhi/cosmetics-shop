import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

const Carousel = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 5000,
}) => {
  const [curr, setCurr] = useState(0);
  const carouselRef = useRef();

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);

  useEffect(() => {
    const carouselElement = carouselRef.current;
    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      endX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      if (startX > endX + 50) {
        next(); // Swipe left to go to next slide
      } else if (startX < endX - 50) {
        prev(); // Swipe right to go to previous slide
      }
    };

    carouselElement.addEventListener("touchstart", handleTouchStart);
    carouselElement.addEventListener("touchmove", handleTouchMove);
    carouselElement.addEventListener("touchend", handleTouchEnd);

    return () => {
      carouselElement.removeEventListener("touchstart", handleTouchStart);
      carouselElement.removeEventListener("touchmove", handleTouchMove);
      carouselElement.removeEventListener("touchend", handleTouchEnd);
    };
  }, [curr]);

  return (
    <div ref={carouselRef} className="relative overflow-hidden md:mx-24">
      <div
        className="flex w-full h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            {slide}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 text-gray-800 rounded-full shadow "
        >
          <ChevronLeft />
        </button>
        <button
          onClick={next}
          className="p-1 text-gray-800 rounded-full shadow "
        >
          <ChevronRight />
        </button>
      </div>
      <div className="absolute left-0 right-0 bottom-4">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-1.5 h-1.5 bg-white rounded-full ${
                curr === i ? "p-0.5" : "bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
