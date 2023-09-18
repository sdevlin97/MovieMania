// File: Details.js

import React, { useState } from "react";
import { Parallax } from "react-parallax";

const Details = () => {
  const [showTrailer, setShowTrailer] = useState(false);

  const tags = [
    {
      title: "The Dark Knight",
      rating: "8.5",
      poster: "./batmanfull.jpg",
      description: "The plot follows the vigilante Batman",
      tags: [
        "Mind-Bending",
        "Epic Romance",
        "Sci-Fi Action",
        "Quentin Tarantino",
        "Time Travel",
        "Thriller",
        "Alternate Reality",
        "Existential",
        "Dystopian",
        "Cyberpunk",
        "Art House",
        "Surreal",
      ],
    },
  ];

  return (
    <div className="flex flex-wrap justify-center bg-black">
      {tags.map((movie, index) => (
        <div key={index} className="p-4 backdrop-blur-md rounded-lg mx-2 my-4 ">
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
                Watch Trailer
              </button>
            </div>
          )}
          <h2 className="text-lg font-semibold text-white text-center">
            {movie.title}
          </h2>
          <p className="text-gray-400 text-sm text-center">
            Rating: {movie.rating}
          </p>
          <div className="text-white text-center mb-2">
            Description: {movie.description}
          </div>
          <p className="text-white text-center">
            Tags: {movie.tags.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Details;
