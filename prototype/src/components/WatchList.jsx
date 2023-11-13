import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const MovieTitles = [
  {
    title: "The Matrix",
    id: 603,
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
  {
    title: "Joker",
    id: 475557,
    poster_path: "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  },
  {
    title: "Interstellar",
    id: 157336,
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
];

const WatchList = () => {
  const [movies, setMovies] = useState(MovieTitles);
  const scrollContainerRef = useRef(null);

  const removeMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
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
    <div
      className="relative h-screen p-20 backdrop-blur"
      style={{
        backgroundImage: `url('./pawel-czerwinski-XM1YUUVXj64-unsplash.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        color: "white",
      }}
    >
      <h1 className="tracking-[.50em] font-bold text-center text-[30px] text-white pb-10">
        Watchlist
      </h1>
      <div className="backdrop-blur">
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
          <div className="flex space-x-4 pr-16">
            {movies.map((movie) => (
              <div key={movie.id} className="inline-block align-top">
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
                  <button
                    onClick={() => removeMovie(movie.id)}
                    className="bg-red-200 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchList;
