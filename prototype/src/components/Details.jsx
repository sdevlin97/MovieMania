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
    <>
      {tags.map((movie, index) => (
        <div
          className="flex justify-center items-center h-full py-4"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${movie.backdrop})`,

            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div
            key={index}
            className="flex rounded-lg mx-2 my-4 w-full max-w-6xl p-4 "
          >
            {showTrailer ? (
              <div className="w-1/2"></div>
            ) : (
              <div className="w-[30%] ">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-[100%] h-[100%] rounded-l-md"
                />
              </div>
            )}

            <div className="w-[100%] p-4">
              <h2 className="text-xl font-semibold text-white mb-2">
                {movie.title}
              </h2>
              <p className="text-gray-400 text-base mb-4">
                {movie.dateReleased} • {movie.genres.join(", ")} •{" "}
                {movie.runtime}
              </p>
              <p className="text-gray-100 mb-4 italic text-lg">
                "{movie.quotation}"
              </p>
              <div className="text-white text-lg mb-4">{movie.description}</div>
              <p className="text-white text-base mb-2">
                Director: {movie.director}
              </p>
              <p className="text-white text-base">Writer: {movie.writer}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default Details;
