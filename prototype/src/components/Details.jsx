import React, { useState } from "react";

const Details = () => {
  const [showTrailer, setShowTrailer] = useState(false);

  const tags = [
    {
      title: "Mission: Impossible - Dead Reckoning Part One",
      rating: "77%",
      poster: "./batmanfull.jpg",
      backdrop: "./backdrop.jpg",
      dateReleased: "07/12/2023",
      genres: ["Action", "Thriller"],
      runtime: "2h 44m",
      quotation: "We all share the same fate.",
      description:
        "Ethan Hunt and his IMF team embark on their most dangerous mission yet: To track down a terrifying new weapon that threatens all of humanity before it falls into the wrong hands. With control of the future and the world's fate at stake and dark forces from Ethan's past closing in, a deadly race around the globe begins. Confronted by a mysterious, all-powerful enemy, Ethan must consider that nothing can matter more than his mission—not even the lives of those he cares about most.",
      director: "Christopher McQuarrie",
      writer: "Erik Jendresen",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center ">
      {tags.map((movie, index) => (
        <div key={index} className="p-4 backdrop-blur-md rounded-lg mx-2 my-4">
          {showTrailer ? (
            <div>
              <video
                src="batmantrailer.mp4"
                controls
                className="mx-auto w-full rounded-md mb-2"
              />
              <button
                onClick={() => setShowTrailer(false)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 mx-auto block"
              >
                Go Back to Image
              </button>
            </div>
          ) : (
            <div>
              <img
                src={movie.poster}
                alt={movie.title}
                className="mx-auto w-full rounded-md mb-2"
                style={{
                  height: "auto",
                  maxHeight: "50%",
                  width: "auto",
                  maxWidth: "50%",
                }}
              />
              <button
                onClick={() => setShowTrailer(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 mx-auto block"
              >
                Play Trailer
              </button>
            </div>
          )}
          <h2 className="text-lg font-semibold text-white text-center">
            {movie.title}
          </h2>
          <p className="text-gray-400 text-sm text-center">
            {movie.dateReleased} • {movie.genres.join(", ")} • {movie.runtime}
          </p>
          <p className="text-white text-center italic mb-2">
            "{movie.quotation}"
          </p>
          <div className="text-white text-center mb-2">{movie.description}</div>
          <p className="text-gray-400 text-sm text-center">
            Director: {movie.director}
          </p>
          <p className="text-gray-400 text-sm text-center">
            Writer: {movie.writer}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Details;
