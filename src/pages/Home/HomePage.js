import React from "react";
import Carousel from "../../ui/Carousel";
import p1 from "../../assets/carousel/p1.jpg";
import p2 from "../../assets/carousel/p2.jpg";
import p3 from "../../assets/carousel/p3.jpg";
import p4 from "../../assets/carousel/p4.jpg";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const slides = [p1, p2, p3, p4];
  const navigate = useNavigate();
  return (
    <>
      <Carousel autoSlide={true}>
        {[...slides.map((s) => <img src={s} key={s} />)]}
      </Carousel>
      <Button
        onClick={() => navigate("/products")}
        className="m-auto mt-5 bg-pink-800 border-pink-900 hover:border-pink-800 hover:bg-pink-700 "
      >
        Shop now
      </Button>
    </>
  );
}
