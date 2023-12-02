import Tags from "./Tags";
import Card from "./Card";
import axios from 'axios';
import { useState, useEffect } from 'react';

function Recommendations() {
  const containerStyle = {
    backgroundImage: `url('./pawel-czerwinski-XM1YUUVXj64-unsplash.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
  };
  
  const [tagsAvailable, setTagsAvailable] = useState([]); // Array of objects [key (tag name): doc_count (# of instances)] - Tags available to be selected
  const [tagsSelected, setTagsSelected] = useState([]); // Array of strings - Tags that have been selected
  const [moviesReturned, setMoviesReturned] = useState([]); // Array of objects [key (movieid): doc_count (# of instances)] - Movieids returned from searching with tagsSelected
  
  // Trigger for when tagsSelected is changed
  // Loads default tags or returns movieids
  useEffect(() => {

    // Elastic won't accept blank search inputs, so if blank = load default tags
    if (tagsSelected.length == 0) {

      // Calls Elasticsearch for default tags, sets returned list of objects (tag) to setTagsAvailable
      const fetchDefaultTags = () => {
        const results = {
          method: 'GET',
          url: 'https://us-central1-moviemania-ba604.cloudfunctions.net/app/fetchDefaultTags'
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
  
      fetchDefaultTags();
    }
    else {

      // Sends list of selected tags to Elasticsearch to search, sets returned list of objects (movieid) to moviesReturned
      const fetchMovieIds = () => {

        // Create string for parameter transfer as we're transferring multiple items under the same parameter name
        var stringTags = "";

        // Build parameter string using strings of tagsSelected
        for (const value of tagsSelected) {
          stringTags = stringTags + value + " ";
        }

        // Call to Elastic and set, described above fetchMovieIds
        const results = {
          method: 'GET',
          url: 'https://us-central1-moviemania-ba604.cloudfunctions.net/app/fetchMovieIds',
          params: {
            tags: stringTags
          }
        };
        axios
          .request(results)
          .then((response) => {
            console.log(response.data);
            setMoviesReturned(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };

      fetchMovieIds();
    }
  }, [tagsSelected]);

  // Trigger for when moviesReturned is changed
  // Uses movieids in moviesReturned to search for tags associated and set to tagsAvailable
  // *Note: Originally this was inside previous useEffect. I split it up for debugging an error and since it works like this, I never undid it :shrug:
  useEffect(() => {
    
    // Elastic won't accept blank search inputs, so if blank = do nothing
    if (!moviesReturned.length == 0) {
      
      // Calls Elasticsearch for tags associated with movieids, sets returned list of objects (tag) to setTagsAvailable
      const fetchNewTags = () => {
        
        // Create string for parameter transfer as we're transferring multiple items under the same parameter name
        var stringMovieIds = "";
        
        // Build parameter string using strings of tagsSelected
        for (const value of moviesReturned) {
          stringMovieIds = stringMovieIds + value.key + " ";
        }

        // Call to Elastic and set, described above fetchNewTags
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
    }
  }, [moviesReturned]);

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
          <Card></Card>
        </div>
        <div className="flex flex-col items-center justify-center pt-4 pb-20 backdrop-blur">
          <input
            type="text"
            placeholder="Enter a name for the list"
            className="bg-white p-2 rounded-md shadow-md"
          />
          <button className="bg-blue-500 text-white rounded-md mt-2 px-20 py-4">
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default Recommendations;
