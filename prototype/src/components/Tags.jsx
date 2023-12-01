import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';

const Tags = () => {
  const [tagsAvailable, setTagsAvailable] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [moviesReturned, setMoviesReturned] = useState([]);
  
  /*
  useEffect(() => {
    const fetchDefaultTags = () => {
      const results = {
        method: 'GET',
        url: 'https://us-central1-moviemania-ba604.cloudfunctions.net/app/fetchDefaultTags',
        params: {
          //tag: chosenTag
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

    fetchDefaultTags();
  }, []);
  */

  useEffect(() => {
    if (tagsSelected.length == 0) {
      const fetchDefaultTags = () => {
        const results = {
          method: 'GET',
          url: 'https://us-central1-moviemania-ba604.cloudfunctions.net/app/fetchDefaultTags',
          params: {
            //tag: chosenTag
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
  
      fetchDefaultTags();
    }
    else {
      const fetchMovieIds = () => {
        var stringTags = "";

        for (const value of tagsSelected) {
          stringTags = stringTags + value + " ";
        }

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

  useEffect(() => {
    if (!moviesReturned.length == 0) {
      const fetchNewTags = () => {
        var stringMovieIds = "";

        for (const value of moviesReturned) {
          stringMovieIds = stringMovieIds + value.key + " ";
        }

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

  const handleTagSelect = (tag) => {
    if (!tagsSelected.includes(tag)) {
      setTagsSelected([...tagsSelected, tag]);
    }    
  };

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
