/* eslint-disable no-inner-declarations */
import Tags from "./Tags";
import Card from "./Card";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, checkLoginState, db } from "../firebase.js"
import { Slide, ToastContainer, toast } from 'react-toastify';

  function Recommendations() {
    const [tagsAvailable, setTagsAvailable] = useState([]); // Array of objects [key (tag name): doc_count (# of instances)] - Tags available to be selected
    const [tagsSelected, setTagsSelected] = useState([]); // Array of strings - Tags that have been selected
    const [movieIdsML, setMovieIdsML] = useState([]); // Array of objects [key (ML movieid): doc_count (# of instances)] - Movieids returned from searching with tagsSelected
    const [movieIdsTMDb, setMovieIdsTMDb] = useState([]); // Array of objects including ID for TMDb
    const [movieIdsTEMP, setMovieIdsTEMP] = useState([]); // Temp duplicate of movieIdsTMDb, in case we later need the full list to still be preserved
    const [movieInfoTMDb, setMovieInfoTMDb] = useState([]); // Array of objects - Info for movies from TMDb
    const [tagListName, setTagListName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Optionally, track any errors

    const handleTagListNameChange = (event) => {
      setTagListName(event.target.value);
    }

    const containerStyle = {
      backgroundImage: `url('./pawel-czerwinski-XM1YUUVXj64-unsplash.jpg')`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      minHeight: "100vh",
    };
  
const saveTagList = async (tagList, tagListName) => {
      let toastId = "Taglist status"
      // need to have an entry for a given list
      let boolCheck = checkLoginState();
      if(boolCheck) {
        let user = auth.currentUser;
        let userID = String(user.uid);
  
        console.log("The list of tags is: ", tagList);
        console.log("The passed in tagListName is: ", tagListName);
  
        // creates the tagList in the database
        const userRef = doc(db, "users", userID);

        // tagList refers to the collection: if you change it you mess up the way we save tags
        const tagListColRef = collection(userRef, "tagList");
        const tagListDocRef = doc(tagListColRef, tagListName);
  
        setDoc(tagListDocRef, {
          tagListName: tagListName,
          tagList: tagList
        });
        await updateDoc(doc(db, "users", userID), {wishlist: "true"});
        toast.success("Tag list saved successfully!", {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 3000, //3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          toastId,
          transition: Slide
        });
      
      } else {
        toast.success("You must be logged in to save your tag list", {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 3000, //3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          toastId,
          transition: Slide
        });
      }
    }
  
  // Trigger for when tagsSelected is changed
  // Loads default ML movieids or returns ML movieids based on tagsSelected
  useEffect(() => {
    setMovieInfoTMDb([]);

    // Elastic won't accept blank search inputs, so if blank = load default tags
    if (tagsSelected.length == 0) {

      // Calls Elasticsearch for default movieids, sets returned list of objects (movieid) to movieIdsML
      const fetchDefaultMLIds = () => {
        const results = {
          method: 'GET',
          url: 'https://us-central1-moviemania-ba604.cloudfunctions.net/app/fetchDefaultMLIds',
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

      fetchDefaultMLIds();
    }
    else {

      // Sends list of selected tags to Elasticsearch to search, sets returned list of objects (movieid) to movieIdsML
      const fetchMLIds = () => {

        // Create string for parameter transfer as we're transferring multiple items under the same parameter name
        var stringTags = "";
        for (const value of tagsSelected) {
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
  }, [tagsSelected]);

  // Trigger for when movieIdsML is changed
  // Uses movieids in movieIdsML to search for TMDb movieIds and set to movieIdsTMDb, duplicated to movieIdsTEMP for loop-removing ids later
  useEffect(() => {
    
    // Elastic won't accept blank search inputs, so if blank = do nothing
    if (!movieIdsML.length == 0) {
            
      // Calls Elasticsearch for tags associated with movieids, sets returned list of objects (tag) to setTagsAvailable
      const fetchNewTags = () => {
        
        // Create string for parameter transfer as we're transferring multiple items under the same parameter name
        var stringMovieIds = "";
        for (const value of movieIdsML) {
          stringMovieIds = stringMovieIds + value.key + " ";
        }

        // Call to Elastic and set
        const results = {
          method: 'GET',
          url: 'https://us-central1-moviemania-ba604.cloudfunctions.net/app/fetchNewTags',
          params: {
            movieids: stringMovieIds
          }
        };
        axios
          .request(results)
          .then((response) => {
            console.log(response.data);
            setTagsAvailable(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };

      fetchNewTags();
      
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

  // Trigger for when tagsAvailable is changed
  // Ensures selected tags are not displayed in available tags
  useEffect(() => {

    // Loops through Selected and Available checking for duplicates between the two
    // If selected tag is found in available tags, it is removed from available tags
    for (const valueSelected of tagsSelected) {
      for (const valueAvailable of tagsAvailable) {
        if (valueAvailable.key == valueSelected) {              
          setTagsAvailable(tagsAvailable.filter((m) => m !== valueAvailable));
        }
      }
    } 
  }, [tagsAvailable]);

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

  // Adds/Removes tag to tagsSelected, triggering useEffect [tagsSelected]
  const handleTagClick = (tag, action) => {
    if (action === "add") {
      if (!tagsSelected.includes(tag)) {
        setTagsSelected([...tagsSelected, tag]);
      }    
    } else if (action === "remove") {
      setTagsSelected(tagsSelected.filter((m) => m !== tag));
    }    
  };

  return (
    <>
      <div style={containerStyle} className="relative bg-black">
          <Tags
            tagsAvailable={tagsAvailable}
            tagsSelected={tagsSelected}
            onTagClick={handleTagClick}
          />
        <div className="backdrop-blur ">
          <Card
            movieInfoTMDb={movieInfoTMDb}
          />
        </div>
        <div className="flex flex-col items-center justify-center pt-4 pb-20 backdrop-blur">
          <input
            type="text"
            value={tagListName}
            onChange={handleTagListNameChange}
            placeholder="Enter a name for the list"
            className="bg-white p-2 rounded-md shadow-md"
          />
          <button onClick={() => saveTagList(tagsSelected, tagListName)} className="bg-blue-500 text-white rounded-md mt-2 px-20 py-4">
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default Recommendations;
