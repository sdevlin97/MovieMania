import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';

const Tags = () => {
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

  // Adds tag to tagsSelected, triggering useEffect [tagsSelected]
  const handleTagSelect = (tag) => {
    if (!tagsSelected.includes(tag)) {
      setTagsSelected([...tagsSelected, tag]);
    }    
  };

  // Removes tag from tagsSelected, triggering useEffect [tagsSelected]
  const handleTagRemove = (tag) => {
    setTagsSelected(tagsSelected.filter((m) => m !== tag));
  };

  return (
  <>
    <div className="text-white flex items-center h-20 p-2 lg:px-4 bg-black">
      Tags:
      <div className="ml-[10px] lg:flex lg:gap-x-12 overflow-x-auto py-[14px]">
          {tagsAvailable && (
            <div className="flex space-x-4">
              {tagsAvailable.map((item) => (
                <button
                  key={item.key}
                  className=" font-bold leading-6 text-white hover:text-cyan-500 text-lg hover:transition ease-in-out duration-300 hover:-translate-y-1 "
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => handleTagSelect(item.key)}
                >
                  |{item.key}|
                </button>
              ))}
            </div>
          )}
      </div>
    </div>
    <div className="text-white flex items-center h-20 p-2 lg:px-4 bg-black">
      Selected Tags:    
      <div className="ml-[10px] lg:flex lg:gap-x-12 overflow-x-auto py-[14px]">
        {tagsSelected && (
          <div className="flex space-x-4">
            {tagsSelected.map((item) => (
              <button
                key={item.key}
                className=" font-bold leading-6 text-white hover:text-cyan-500 text-lg hover:transition ease-in-out duration-300 hover:-translate-y-1 "
                style={{ whiteSpace: "nowrap" }}
                onClick={() => handleTagRemove(item)}
              >
                |{item}|
              </button>
          ))}
          </div>
        )}
      </div>
    </div>
  </>
  );
};

export default Tags;
