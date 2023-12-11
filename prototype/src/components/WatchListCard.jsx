import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { auth, checkLoginState, db } from "../firebase.js";
import { Slide, ToastContainer, toast } from "react-toastify";
import {
  collection,
  doc,
  getDocs,
  deleteDoc
} from "firebase/firestore";

const WatchListCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);

  const handleDeleteMovie = async (title) => {
    await deleteMovieFromWatchlist(title);
    setData((prevLists) => prevLists.filter((list) => list.movie_title !== title));
  };

  async function deleteMovieFromWatchlist(title) {
    const toastId = "Movie Deletion Status";

    let boolCheck = checkLoginState();
    if (boolCheck) {
      const user = auth.currentUser;
      const userID = String(user.uid);
      const userRef = doc(db, "users", userID);
      const listColRef = collection(userRef, "watchList");
      const listDocRef = doc(listColRef, title);
      await deleteDoc(listDocRef);

      toast.success(`${title} has been deleted from your watch list!`, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000, // 2 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId,
        transition: Slide,
      });
    } else {
      toast.error(
        "You must be logged in to delete movies. You shouldn't be here",
        {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 2000, // 2 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          toastId,
          transition: Slide,
        }
      );
    }
  }

  useEffect(() => {
    async function fetchMovieListFromDatabase() {
      let boolCheck = checkLoginState();
  
      const user = auth.currentUser;
      let userID = String(user.uid);
  
      if (boolCheck) {
        const docRef = doc(db, "users", userID);
        const watchListColRef = collection(docRef, "watchList");
        const docsSnap = await getDocs(watchListColRef);
  
        const fetchedData = [];
        docsSnap.forEach((doc) => {
          fetchedData.push(doc.data());
        });
  
        return fetchedData;
      }
    };

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
      let userID = String(user.uid);

      if (boolCheck) {
        const docRef = doc(db, "users", userID);
        const watchListColRef = collection(docRef, "watchList");
        const docsSnap = await getDocs(watchListColRef);

        const fetchedData = [];
        docsSnap.forEach((doc) => {
          fetchedData.push(doc.data());
        });

        return fetchedData;
      }
    }

    async function fetchData() {
      try {
        const response = await fetchMovieListFromDatabase();
        setData(response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

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
        <p>Error: {error.message}</p>
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
                  <button
                  className="bg-black hover:bg-red-600 text-white font-bold mt-2 py-2 px-4 rounded"
                  onClick= {() => handleDeleteMovie(movie.movie_title) }
                  >
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
});
}
export default WatchListCard;
