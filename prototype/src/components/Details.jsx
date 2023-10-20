import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const Details = () => {
  const {id} = useParams();
  const [data, setData] = useState(null); // Initialize the state with null or an initial value
  const [loading, setLoading] = useState(true); // Optionally, you can track loading state
  const [error, setError] = useState(null); // Optionally, track any errors
  const [showTrailer, setShowTrailer] = useState(false);

  // API Call to get details for a given movie
  function createGenreString(data) {
    const names = data.map((item) => item.name);
    return names.join(", ");
  }

  useEffect(() => {
    // Gets Movie Details
    async function fetchData() {
      try {
        const response = await fetch(
          `https://us-central1-moviemania-ba604.cloudfunctions.net/app/movieDetails/${id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log("The movie details we got is: ", result);
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : data ? (
        <div
          className="flex justify-center items-center h-full py-4"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className="flex rounded-lg mx-2 my-4 w-full max-w-6xl p-4 ">
            <div className="w-[30%]">
              <img
                src={"https://image.tmdb.org/t/p/original/" + data.poster_path }
                alt={data.title}
                className="w-[100%] h-[100%] rounded-l-md"
              />
            </div>
            <div className="w-[100%] p-4">
              <h2 className="text-xl font-semibold text-white mb-2">
                {data.title}
              </h2>
              <p className="text-gray-400 text-base mb-4">
                {data.release_date} • {createGenreString(data.genres)} •{" "}
                {data.runtime} min
              </p>

              <p className="text-gray-100 mb-4 italic text-lg">
                "{data.tagline}"
              </p>

              <div className="text-white text-lg mb-4">{data.overview}</div>
              <p className="text-[1.5rem] text-white">
                {data.vote_average}{" "}
                <span className="text-[1rem] ml-[0.1rem] text-white"> /10</span>
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

Details.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Details;
