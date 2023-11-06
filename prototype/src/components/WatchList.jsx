import React, { useState } from "react";

const MovieTitles = [
  {
    title: "Inception",
    tmdbId: 27205,
  },
  {
    title: "The Matrix",
    tmdbId: 603,
  },
  {
    title: "Interstellar",
    tmdbId: 157336,
  },
  {
    title: "The Dark Knight",
    tmdbId: 155,
  },
  {
    title: "Pulp Fiction",
    tmdbId: 680,
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
          <li key={movie.tmdbId} className="mb-4">
            {movie.title}
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
