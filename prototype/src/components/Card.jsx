/* eslint-disable react/jsx-key */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Card = ({movieInfoTMDb}) => {
  const scrollContainerRef = useRef(null);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + 500,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft - 500,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      {movieInfoTMDb && (
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
              {movieInfoTMDb.map((movie, index) => (
                <div className="flex flex-col items-center p-4 rounded-lg shadow-md backdrop-blur-0 inline-block">
                  <Link to={`/details/${movie.id}`}>
                    <img
                      src={
                        "https://image.tmdb.org/t/p/original/" +
                        movie.poster_path
                      }
                      alt={movie.title}
                      className="max-w-xs max-h-xs object-fill rounded-md mb-2"
                    />
                  </Link>
                  <h2 className="text-lg font-semibold text-white text-center">
                    {movie.title}
                  </h2>
                  <p className="text-gray-400 text-sm text-center">
                    Rating: {movie.vote_average}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}
    </div>
  );
};

export default Card;
