import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import Card from "./Card.jsx";
import axios from 'axios';
import { auth, checkLoginState, db } from "../firebase.js"
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState(null); // Initialize the state with null or an initial value
  const [loading, setLoading] = useState(true); // Optionally, you can track loading state
  const [error, setError] = useState(null); // Optionally, track any errors
  const [showTrailer, setShowTrailer] = useState(false);
  const [tagsSelected, setTagsSelected] = useState([]); // Array of strings - Tags that have been selected
  const [movieIdML, setMovieIdML] = useState([]); // Array of objects [key (ML movieid): doc_count (# of instances)] - Movieids returned from searching with tagsSelected
  const [movieIdsML, setMovieIdsML] = useState([]); // Array of objects [key (ML movieid): doc_count (# of instances)] - Movieids returned from searching with tagsSelected
  const [movieIdsTMDb, setMovieIdsTMDb] = useState([]); // Array of objects including ID for TMDb
  const [movieIdsTEMP, setMovieIdsTEMP] = useState([]); // Temp duplicate of movieIdsTMDb, in case we later need the full list to still be preserved
  const [movieInfoTMDb, setMovieInfoTMDb] = useState([]); // Array of objects - Info for movies from TMDb

  // API Call to get details for a given movie
  function createGenreString(data) {
    const names = data.map((item) => item.name);
    return names.join(", ");
  }

  async function addToWatchlist(id, title, backgroundImage, poster, release_date, genres, runtime, tagline, overview, vote_average) {
    let boolCheck = checkLoginState()
    console.log("The checked login state is: ", boolCheck);
    if (boolCheck) {
        //add watchlist firebase code here
        let movieId = id;
        const user = auth.currentUser;
        let userID = String(user.uid);
        
        console.log("The movie ID is: ", movieId);
        console.log("The movie title is: ", title);
        // Creates the custom watchlist and adds data in the database
        const userRef = doc(db, "users", userID);
        const watchlistColRef = collection(userRef, "watchList");
        const watchlistDocRef = doc(watchlistColRef, title);
        setDoc(watchlistDocRef, {
            movie_title: title,
            movie_id: movieId,
            backgroundImage: `https://image.tmdb.org/t/p/original${backgroundImage}`,
            poster: `https://image.tmdb.org/t/p/original${poster}`,
            release_date: release_date,
            genres: genres,
            runtime: runtime,
            tagline: tagline,
            overview: overview,
            vote_average: vote_average
        });

        // Add field to user document keeping track of what list collections we have
        // created in the database to be referenced in the settings.js

        await updateDoc(doc(db, "users", userID), {wishlist: "true"});

        alert(`${title} has been added to your Watchlist`);

    } else {
        // don't add logic to buttons
        alert("You must be logged in to add to your Watchlist.");
    }
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
    
    // Clears movieInfoTMDb between pages
    setMovieInfoTMDb([]);

    // Uses TMDb movieId from page to search Elastic for ML movieId, sets returned object (movieid) to setMovieIdML
    const fetchMLIdFromTMDb = () => {

      // Call to Elastic and set
      const results = {
        method: 'GET',
        url: 'https://us-central1-moviemania-ba604.cloudfunctions.net/app/fetchMLIdFromTMDb',
        params: {
          movieid: id
        }
      };
      axios
        .request(results)
        .then((response) => {
          console.log(response.data);
          setMovieIdML(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchMLIdFromTMDb();
  }, [id]);

  // Trigger for when movieIdML is changed
  // Searches for tags associated with movieid
  useEffect(() => {
    
    // Elastic won't accept blank search inputs, so if blank = do nothing
    if (!movieIdML.length == 0) {

      // Calls Elasticsearch for tags associated with movieid, sets returned list of objects (tag) to setTagsSelected
      const fetchNewTags = () => {
        
        // Call to Elastic and set
        const results = {
          method: 'GET',
          url: 'https://us-central1-moviemania-ba604.cloudfunctions.net/app/fetchNewTagsDetails',
          params: {
            movieids: movieIdML[0]._source.movieId
          }
        };
        axios
          .request(results)
          .then((response) => {
            console.log(response.data);
            setTagsSelected(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };

      fetchNewTags();
    }
  }, [movieIdML]);
  
  // Trigger for when tagsSelected is changed
  // Returns ML movieids based on selectedTags
  useEffect(() => {

    // Elastic won't accept blank search inputs, so if blank = do nothing
    if (!tagsSelected.length == 0) {

      // Sends list of selected tags to Elasticsearch to search, sets returned list of objects (movieid) to movieIdsML
      const fetchMLIds = () => {

        // Create string for parameter transfer as we're transferring multiple items under the same parameter name
        var stringTags = "";
        for (const value of tagsSelected) {
          stringTags = stringTags + value.key + " ";
        }

        // Call to Elastic and set
        const results = {
          method: 'GET',
          url: 'https://us-central1-moviemania-ba604.cloudfunctions.net/app/fetchMLIdsDetails',
          params: {
            tags: stringTags,
            movieid: movieIdML[0]._source.movieId
          }
        };
        axios
          .request(results)
          .then((response) => {
            console.log(response.data);
            setMovieIdsML(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };

      fetchMLIds();
    }
  }, [tagsSelected]);

  // Trigger for when movieIdsML is changed
  // Uses movieids in movieIdsML to search for TMDb movieIds and set to movieIdsTMDb, duplicated to movieIdsTEMP for loop-removing ids later
  useEffect(() => {
    
    // Elastic won't accept blank search inputs, so if blank = do nothing
    if (!movieIdsML.length == 0) {
      
      // Calls Elasticsearch for tags associated with movieids, sets returned list of objects (tag) to setTagsAvailable
      const fetchTMDbIds = () => {
        
        // Create string for parameter transfer as we're transferring multiple items under the same parameter name
        var stringMovieIds = "";
        for (const value of movieIdsML) {
          stringMovieIds = stringMovieIds + value.key + " ";
        }

        // Call to Elastic and set
        const results = {
          method: 'GET',
          url: 'https://us-central1-moviemania-ba604.cloudfunctions.net/app/fetchTMDbIds',
          params: {
            movieids: stringMovieIds
          }
        };
        axios
          .request(results)
          .then((response) => {
            console.log(response.data);
            setMovieIdsTMDb(response.data);
            setMovieIdsTEMP(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };

      fetchTMDbIds();
    }
  }, [movieIdsML]);

  // Trigger for when movieIdsTEMP is changed
  // Uses TMDb movieids in movieIdsTEMP to return movie info details from TMDb
  useEffect(() => {
        
    if (!movieIdsTEMP.length == 0) {
      
      // Call to TMDb and set
      async function fetchTMDbMovieInfo() {
        try {
          const response = await fetch(
            `https://us-central1-moviemania-ba604.cloudfunctions.net/app/movieDetails/${movieIdsTEMP[0]._source.tmdbId}`
          );
    
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          console.log("The movie details we got is: ", result);
          setMovieInfoTMDb([...movieInfoTMDb, result]);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      }      

      fetchTMDbMovieInfo();  
    }
    // This else hides an empty log when the page is initialized
    else {
      // This extra if hides an empty log when the page is initialized
      if (!movieInfoTMDb.length == 0) {
        console.log("TMDb Movie Info: ", movieInfoTMDb);
      }
    }    
  }, [movieIdsTEMP]);
  
  // Trigger for when movieInfoTMDb is changed
  // Filters out previously searched movieId
  // This unfortunate loop between movieIdsTEMP and movieInfoTMDB is due to the setMovieInfoTMDb not saving until it's left the useEffect
  useEffect(() => {
         
    // This if hides an empty log when the page is initialized
    if (!movieIdsTEMP.length == 0) {
      setMovieIdsTEMP(movieIdsTEMP.filter((m) => m !== movieIdsTEMP[0]));
    }
    
  }, [movieInfoTMDb]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : data ? (
        <>
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
                  src={
                    "https://image.tmdb.org/t/p/original/" + data.poster_path
                  }
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
                  <span className="text-[1rem] ml-[0.1rem] text-white">
                    {" "}
                    /10
                  </span>
                </p>

                <button
                  className="text-white "
                  onClick={() => setShowTrailer(true)}
                >
                  <i class="fa-solid fa-play mr-2 mt-4"></i> Watch Trailer
                </button>
                <button className="ml-20 text-white"  onClick={() => addToWatchlist(data.id, data.title, data.backdrop_path, data.poster_path, data.release_date, data.genres, data.runtime, data.tagline, data.overview, data.vote_average)}>
                  <i class="fa-solid fa-plus"></i> Watchlist
                </button>
              </div>
            </div>
          </div>
          <h1 className="tracking-[.50em] mt-2 font-bold text-center text-[30px] text-white">
            Similar Movies
          </h1>
          <Card
            movieInfoTMDb={movieInfoTMDb}
          />
          <Modal isOpen={showTrailer} toggleModal={() => setShowTrailer(false)}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/2m1drlOZSDw`}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </Modal>
        </>
      ) : null}
    </div>
  );
};

Details.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Details;