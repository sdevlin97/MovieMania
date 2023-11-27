import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { auth, checkLoginState, db } from "../firebase.js"
import { getFirestore, collection, addDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";

const WatchListCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const scrollContainerRef = useRef(null);



  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://us-central1-moviemania-ba604.cloudfunctions.net/app/popularMovies"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleMovieSelect = (movie) => {
    if (selectedMovies.includes(movie)) {
      setSelectedMovies(selectedMovies.filter((m) => m !== movie));
    } else {
      setSelectedMovies([...selectedMovies, movie]);
    }
  };

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
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : data ? (
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
              {data.results.map((movie) => (
                <div
                  key={movie.id}
                  className="flex flex-col items-center p-4 rounded-lg shadow-md backdrop-blur-0 inline-block"
                >
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
                  <button className="bg-black hover:bg-red-600 text-white font-bold mt-2 py-2 px-4 rounded">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default WatchListCard;
