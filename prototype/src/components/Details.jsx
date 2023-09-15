import React from "react";
import { Parallax } from "react-parallax";

const Details = () => {
  const tags = [
    {
      title: "The Dark Knight",
      rating: "8.5",
      poster: "./batmanfull.jpg",
      description:
        "The plot follows the vig police lieutenant James Gordon, and district attorney Harvey Dent, who form an alliance to dismantle organized crime in Gotham City. Their efforts are derailed by the Joker, an anarchistic mastermind who seeks to test how far the Batman will go to save the city from chaos. The plot follows the vigilante Batman, police lieutenant James Gordon, and district attorney Harvey Dent, who form an alliance to dismantle organized crime in Gotham City. Their efforts are derailed by the Joker, an anarchistic mastermind who seeks to test how far the Batman will go to save the city from chaos.  ",
      tags: ["Action", "Crime", "Drama"],
    },
    // Add more movie data here...
  ];

  return (
    <Parallax
      bgImage="./pawel-czerwinski-XM1YUUVXj64-unsplash.jpg"
      strength={800}
      className="h-screen w-screen flex items-center justify-center"
    >
      {tags.map((movie, index) => (
        <div
          key={index}
          className="bg-black p-4 rounded-md mx-2 overflow-y-auto"
        >
          <img
            src={movie.poster}
            alt={movie.title}
            className="mx-auto w-[300px] h-[400px] object-fill rounded-md mb-2"
          />
          <h2 className="text-lg font-semibold text-white text-center">
            {movie.title}
          </h2>
          <p className="text-gray-400 text-sm text-center">
            Rating: {movie.rating}
          </p>
          <div className="text-white text-center ">
            Description: {movie.description}
          </div>
          <p className="text-white text-center">
            Tags: {movie.tags.join(", ")}
          </p>
        </div>
      ))}
    </Parallax>
  );
};
export default Details;
