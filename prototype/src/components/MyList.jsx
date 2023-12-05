import React, { useState, useEffect, useCallback } from "react";
import MadeList from "./MadeList";
//DevTag is a diffrent way to get tags , you can remove it and use Tags component only or same in reverse
import DevTag from "./DevTag";
import Card from "./Card";
import axios from 'axios';
import { auth, checkLoginState, db } from "../firebase.js";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { Slide, ToastContainer, toast } from "react-toastify";

const MyList = () => {
  const [lists, setLists] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieIdsML, setMovieIdsML] = useState([]); // Array of objects [key (ML movieid): doc_count (# of instances)] - Movieids returned from searching with tagsSelected
  const [movieIdsTMDb, setMovieIdsTMDb] = useState([]); // Array of objects including ID for TMDb
  const [movieIdsTEMP, setMovieIdsTEMP] = useState([]); // Temp duplicate of movieIdsTMDb, in case we later need the full list to still be preserved
  const [movieInfoTMDb, setMovieInfoTMDb] = useState([]); // Array of objects - Info for movies from TMDb

  async function fetchTagListFromDatabase() {
    let boolCheck = checkLoginState();

    const user = auth.currentUser;
    let userID = String(user.uid);

    if (boolCheck) {
      const docRef = doc(db, "users", userID);
      const watchListColRef = collection(docRef, "tagList");
      const docsSnap = await getDocs(watchListColRef);

      const fetchedData = [];
      docsSnap.forEach((doc) => {
        console.log("The tagList is: ", doc.data());
        fetchedData.push(doc.data());
        console.log("the taglist in fetchedData is: ", fetchedData);
      });

      return fetchedData;
    }
  }

  const handleRemoveList = async (name) => {
    try {
      await deleteFromDatabase(name);
      setLists((prevLists) => prevLists.filter((list) => list.tagListName !== name));
    } catch (error) {
      console.log("Error deleting list from database: ", error);
    }
  };

  const deleteFromDatabase = async (savedName) => {
    const toastId = "Database Deletion Status";

    let boolCheck = checkLoginState();
    if (boolCheck) {
      console.log("the name of the list we are deleting is: ", savedName);
      const user = auth.currentUser;
      const userID = String(user.uid);
      const userRef = doc(db, "users", userID);
      const listColRef = collection(userRef, "tagList");
      const listDocRef = doc(listColRef, savedName);
      await deleteDoc(listDocRef);

      toast.success(`${savedName} has been deleted from your tag lists!`, {
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
        "You must be logged in to view delete lists. You shouldn't be here",
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
  };

  const handleSelectTags = (tags) => {
    setSelectedTags(tags);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchTagListFromDatabase();
        console.log("The response is: ", response);
        setLists(response);
        setLoading(false);
      } catch (error) {
        console.log("The error in our catch block is: ", error);
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  
  // Trigger for when selectedTags is changed
  // Returns ML movieids based on selectedTags
  useEffect(() => {
    setMovieInfoTMDb([]);

    // Elastic won't accept blank search inputs, so if blank = do nothing
    if (!selectedTags.length == 0) {

      // Sends list of selected tags to Elasticsearch to search, sets returned list of objects (movieid) to movieIdsML
      const fetchMLIds = () => {

        // Create string for parameter transfer as we're transferring multiple items under the same parameter name
        var stringTags = "";
        for (const value of selectedTags) {
          stringTags = stringTags + value + " ";
        }

        // Call to Elastic and set
        const results = {
          method: 'GET',
          url: 'https://us-central1-moviemania-ba604.cloudfunctions.net/app/fetchMLIds',
          params: {
            tags: stringTags
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
  }, [selectedTags]);

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

  const containerStyle = {
    backgroundImage: `url('./pawel-czerwinski-XM1YUUVXj64-unsplash.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
  };

  return (
    <>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : lists ? (
          <div style={containerStyle} className="relative bg-black">
            <div className="flex justify-center items-center text-lg text-white h-20 bg-black">
              <h1 className="font-bold text-[60px]">Saved List</h1>
            </div>

            {lists.map((object, index) => (
              <div
                key={index}
                className="text-white flex items-center h-20 p-2 lg:px-4 bg- bg-black"
              >
                <MadeList
                  key={index}
                  savedName={object.tagListName}
                  nametags={object.tagList}
                  onRemove={handleRemoveList}
                  onSelect={handleSelectTags}
                />
              </div>
            ))}
            <div className="text-white flex items-center h-20 p-2 lg:px-4 bg-black ">
              Selected: <DevTag selectedTags={selectedTags} />
            </div>
            <div className="backdrop-blur ">
              <Card
                movieInfoTMDb={movieInfoTMDb}
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default MyList;
