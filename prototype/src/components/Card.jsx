import React, { useState, useRef } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const tags = [
  { title: "The Dark Knight", rating: "8.5", poster: "./batmanfull.jpg" },
  { title: "Superman Returns", rating: "5.5", poster: "./supermanfull.jpg" },
  { title: "Green Lantern", rating: "1.0", poster: "./greenlantern.jpg" },
  { title: "Deadpool 2 ", rating: "9.3", poster: "./deadpool.jpg" },
  { title: "Spider-Man: No Way Home", rating: "9.5", poster: "./spider.jpg" },
  { title: "Thor Ragnarok", rating: "7.5", poster: "./thor.jpg" },
  // Add more movie data here...
];

const Card = () => {
  const [selectedMovies, setSelectedMovies] = useState([]);
  const scrollContainerRef = useRef(null);

  const handleMovieSelect = (movie) => {
    // Toggle the selected state of the movie
    if (selectedMovies.includes(movie)) {
      setSelectedMovies(selectedMovies.filter((m) => m !== movie));
    } else {
      setSelectedMovies([...selectedMovies, movie]);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + 500, // Adjust the scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft - 500, // Adjust the scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 backdrop-blur-none text-white px-[12px] py-[50px] rounded-md hover:bg-black z-10 text-lg font-black"
        onClick={scrollLeft}
      >
        &lt;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 backdrop-blur-none text-white px-[12px] py-[50px] rounded-md hover:bg-black z-10 text-lg font-black"
        onClick={scrollRight}
      >
        &gt;
      </button>
      <div
        className="overflow-x-auto whitespace-nowrap"
        ref={scrollContainerRef}
      >
        <div className="flex space-x-4 p-4 pr-16">
          {tags.map((movie, index) => (
            <Link to="/details" key={index}>
              {/* Wrap the card with a Link */}
              <div className="p-4 rounded-lg shadow-md backdrop-blur-0 inline-block">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="max-w-xs max-h-xs object-fill rounded-md mb-2"
                />
                <h2 className="text-lg font-semibold text-white text-center">
                  {movie.title}
                </h2>
                <p className="text-gray-400 text-sm text-center">
                  Rating: {movie.rating}
                </p>
                <div className="mt-2 mx-4 flex justify-center">
                  <button
                    className={`${
                      selectedMovies.includes(movie)
                        ? "bg-cyan-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    } px-4 py-2 rounded-md transition-colors duration-300 hover:bg-cyan-600`}
                    onClick={() => handleMovieSelect(movie)}
                  >
                    {selectedMovies.includes(movie) ? "Selected" : "Select"}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
