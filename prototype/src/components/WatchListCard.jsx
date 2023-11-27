import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { auth, checkLoginState, db } from "../firebase.js";
import {
  collection,
  doc,
  getDocs
} from "firebase/firestore";

const WatchListCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const scrollContainerRef = useRef(null);

  const addData = (newData) => {
    setData(prevData => {
      // Ensure prevData is initialized as an empty array if it's undefined
      const updatedData = prevData ? [...prevData, newData] : [newData];
      return updatedData;
    });
  };

  useEffect(() => {
    async function fetchMovieListFromDatabase() {
      let boolCheck = checkLoginState();

      const user = auth.currentUser;
      console.log("The current user id is: ", auth.currentUser);
      let userID = String(user.uid);

      if (boolCheck) {
        console.log("The boolcheck is: ", boolCheck);
        const docRef = doc(db, "users", userID);
        const watchListColRef = collection(docRef, "watchList");
        const docsSnap = await getDocs(watchListColRef);

        const fetchedData = [];
        docsSnap.forEach((doc) => {
          console.log("The document data is: ", doc.data());
          // addData(doc.data());
          fetchedData.push(doc.data());
          console.log("the data in fetchedData is: ", fetchedData);
        });

        return fetchedData;
      }
    }

    async function fetchData() {
      try {
        const response = await fetchMovieListFromDatabase();
        // const jsonData = JSON.parse(response);
        // console.log("The response before we convert to json data is: ", jsonData);
      console.log("The response is: ", response);
        setData(response);
        setLoading(false);
      } catch (error) {
        console.log("The error in our catch block is: ", error);
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleMovieSelect = (movie) => {
    if (selectedMovies.includes(movie)) {
      setSelectedMovies(selectedMovies.filter((m) => m !== movie));
    } else {
      setSelectedMovies([...selectedMovies, movie]);
    }
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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Siobahn!! Error: {error.message}</p>
      ) : data ? (
        <div className="relative">
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
            <div className="flex space-x-4 p-4 pr-16">
              {data.map((movie) => (
                <div
                  key={movie.movie_id}
                  className="flex flex-col items-center p-4 rounded-lg shadow-md backdrop-blur-0 inline-block"
                >
                  <Link to={`/details/${movie.movie_id}`}>
                    <img
                      src={movie.poster}
                      alt={movie.movie_title}
                      className="max-w-xs max-h-xs object-fill rounded-md mb-2"
                    />
                  </Link>
                  <h2 className="text-lg font-semibold text-white text-center">
                    {movie.movie_title}
                  </h2>
                  <p className="text-gray-400 text-sm text-center">
                    Rating: {movie.vote_average}
                  </p>
                  <button className="bg-black hover:bg-red-600 text-white font-bold mt-2 py-2 px-4 rounded">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default WatchListCard;
