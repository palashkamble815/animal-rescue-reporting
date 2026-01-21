import React, { useState, useEffect } from 'react';

const images = [
  'http://localhost:5000/uploads/dog8.jpg',
  'http://localhost:5000/uploads/cat2.jpg',
  'http://localhost:5000/uploads/dog7.jpg',
  'http://localhost:5000/uploads/cat1.jpeg',
  'http://localhost:5000/uploads/do5.jpg',
  'http://localhost:5000/uploads/dog6.jpg',
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-xl group">
      {/* Image */}
      <img
        src={images[currentIndex]}
        alt={`Carousel slide ${currentIndex}`}
        className="w-full h-96 object-cover transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

      {/* Slide Number */}
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 text-sm rounded-full shadow-lg backdrop-blur-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? 'bg-white scale-125 shadow-md'
                : 'bg-gray-400 hover:bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() =>
          setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
      >
        ◀
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
      >
        ▶
      </button>
    </div>
  );
};

export default Carousel;
