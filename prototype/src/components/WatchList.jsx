import React, { useState } from "react";
import { Link } from "react-router-dom";

const MovieTitles = [
  {
    title: "Inception",
    id: 27205,
  },
  {
    title: "The Matrix",
    id: 603,
  },
  {
    title: "Interstellar",
    id: 157336,
  },
  {
    title: "Five Nights At Freddys",
    id: 507089,
  },
  {
    title: "Pulp Fiction",
    id: 680,
  },
];

const WatchList = () => {
  // Using useState to manage the list of movies e.i remove movies
  const [movies, setMovies] = useState(MovieTitles);

  const containerStyle = {
    backgroundImage: `url('./pawel-czerwinski-XM1YUUVXj64-unsplash.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    color: "white",
    padding: "20px",
  };

  // Function to remove a movie from the list it works for now - kevin
  const removeMovie = (tmdbId) => {
    setMovies(movies.filter((movie) => movie.tmdbId !== tmdbId));
  };

  return (
    <div style={containerStyle} className="relative h-screen">
      <ul>
        {movies.map((movie) => (
          <li key={movie.id} className="mb-4">
            <Link to={`/details/${movie.id}`}> {movie.title}</Link>
            <button
              onClick={() => removeMovie(movie.tmdbId)}
              className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchList;
