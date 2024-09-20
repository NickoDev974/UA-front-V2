import React, { useState } from "react";
//import "./Carousel.css";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel">
      <div className="slide">
        <img src={images[currentIndex].src} alt={images[currentIndex].alt} />
      </div>
      <button onClick={goToPreviousSlide} className="control prev">
        ⬅️
      </button>
      <button onClick={goToNextSlide} className="control next">
        ➡️
      </button>
    </div>
  );
};

export default Carousel;
