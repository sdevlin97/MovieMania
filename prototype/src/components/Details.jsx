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
        <div className="flex flex-wrap justify-center bg-black">
        <div className="p-4 backdrop-blur-md rounded-lg mx-2 my-4 ">
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
                src={"https://image.tmdb.org/t/p/original/" + data.poster_path }
                alt={data.title}
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
            {data.title}
          </h2>
          <p className="text-gray-400 text-sm text-center">
            Rating: {data.vote_average}
          </p>
          <div className="text-white text-center mb-2">
            Description: {data.overview}
          </div>
          <p className="text-white text-center">Tags: {createGenreString(data.genres)}</p>
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
