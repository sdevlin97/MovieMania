import React from "react";
const tags = [
  { title: "MovieName", rating: "8.5", poster: "../images/movie1.png" },
  { title: "MovieName", rating: "2.5", poster: "../images/movie2.png" },
  { title: "MovieName", rating: "4.5", poster: "../images/movie3.png" },
  { title: "MovieName", rating: "3.5", poster: "../images/movie4.png" },
  { title: "MovieName", rating: "5.5", poster: "../images/movie5.png" },
  { title: "MovieName", rating: "7.5", poster: "../images/movie6.png" },
  { title: "MovieName", rating: "4.5", poster: "../images/movie7.png" },
  { title: "MovieName", rating: "8.5", poster: "../images/movie8.png" },
  { title: "MovieName", rating: "8.5", poster: "../images/movie9.png" },
  { title: "MovieName", rating: "7.5", poster: "../images/movie10.png" },
  { title: "MovieName", rating: "6.5", poster: "../images/movie11.png" },
];
const Card = () => {
  return (
    <div className=" ml-[10px] hidden lg:flex lg:gap-x-12">
      {tags.map((item) => (
        <a
          key={item.name}
          className=" font-bold leading-6 text-white hover:text-cyan-500 text-lg hover:transition ease-in-out duration-300 hover:-translate-y-1"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};

export default Card;
