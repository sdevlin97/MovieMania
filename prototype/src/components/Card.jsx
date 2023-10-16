/* eslint-disable react/jsx-key */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getPopularMovies } from "../BackendCalls";

// const tags = [
//   { title: "The Dark Knight", rating: "8.5", poster: "./batmanfull.jpg" },
//   { title: "Superman Returns", rating: "5.5", poster: "./supermanfull.jpg" },
//   { title: "Green Lantern", rating: "1.0", poster: "./greenlantern.jpg" },
//   { title: "Deadpool 2 ", rating: "9.3", poster: "./deadpool.jpg" },
//   { title: "Spider-Man: No Way Home", rating: "9.5", poster: "./spider.jpg" },
//   { title: "Thor Ragnarok", rating: "7.5", poster: "./thor.jpg" },
//   { title: "The Dark Knight", rating: "8.5", poster: "./batmanfull.jpg" },
//   { title: "Superman Returns", rating: "5.5", poster: "./supermanfull.jpg" },
//   { title: "Green Lantern", rating: "1.0", poster: "./greenlantern.jpg" },
//   { title: "Deadpool 2 ", rating: "9.3", poster: "./deadpool.jpg" },
//   { title: "Spider-Man: No Way Home", rating: "9.5", poster: "./spider.jpg" },
//   { title: "Thor Ragnarok", rating: "7.5", poster: "./thor.jpg" },
//   { title: "The Dark Knight", rating: "8.5", poster: "./batmanfull.jpg" },
//   { title: "Superman Returns", rating: "5.5", poster: "./supermanfull.jpg" },
//   { title: "Green Lantern", rating: "1.0", poster: "./greenlantern.jpg" },
//   { title: "Deadpool 2 ", rating: "9.3", poster: "./deadpool.jpg" },
//   { title: "Spider-Man: No Way Home", rating: "9.5", poster: "./spider.jpg" },
//   { title: "Thor Ragnarok", rating: "7.5", poster: "./thor.jpg" },
// ];

const Card = () => {
  const [data, setData] = useState(null); // Initialize the state with null or an initial value
  const [loading, setLoading] = useState(true); // Optionally, you can track loading state
  const [error, setError] = useState(null); // Optionally, track any errors

  const [selectedMovies, setSelectedMovies] = useState([]);
  const scrollContainerRef = useRef(null);

    useEffect(() => {

    // Inside the useEffect, you can make an asynchronous API call
    async function fetchData() {
      try {
        const response = await fetch(`https://us-central1-moviemania-ba604.cloudfunctions.net/app/popularMovies`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result); // Update the state with the fetched data
        setLoading(false); // Set loading to false
        console.log("The data in result is: ", data);
      } catch (error) {
        setError(error); // Handle and set error state
        setLoading(false); // Set loading to false in case of an error
      }
    }

    fetchData(); // Call the asynchronous function when the component mounts
  }, [data]); // The empty dependency array ensures that the effect runs once, similar to componentDidMount

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
        // Render your data here
        <div>
          <h1>{data.results[0].original_title}</h1>
          <p>{data.results[0].description}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Card;

// put this junk on line 93 and 94
/*
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
          {data.map((movie, index) => (
            
            <div className="p-4 rounded-lg shadow-md backdrop-blur-0 inline-block">
              <Link to="/details" key={index}>
                <img
                  src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
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
          ))}
        </div>
      </div>
    </div>
*/