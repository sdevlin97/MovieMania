import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';

const Tags = () => {
  const [tagsAvailable, setTagsAvailable] = useState(null);
  const [tagsSelected, setTagsSelected] = useState(null);
  
  useEffect(() => {
    const fetchData = () => {
      const results = {
        method: 'GET',
        url: 'https://us-central1-moviemania-ba604.cloudfunctions.net/app/defaultTags',
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

    fetchData();
  }, []);

  return (
  <>
    <div className="text-white flex items-center h-20 p-2 lg:px-4 bg-black ">
      Tags: 
      <div className="ml-[10px] hidden lg:flex lg:gap-x-12 overflow-x-auto py-[14px]">
        {tagsAvailable && (
          <div className='flex space-x-4'>
            {tagsAvailable.map((item) => (
              <a
                key={item.key}
                className=" font-bold leading-6 text-white hover:text-cyan-500 text-lg hover:transition ease-in-out duration-300 hover:-translate-y-1 "
                style={{ whiteSpace: "nowrap" }}
              >
                |{item.key}|
              </a>
          ))}
          </div>
        )}
      </div>
    </div>
    <div className="text-white flex items-center h-20 p-2 lg:px-4 bg-black ">
      Selected Tags:    
      <div className="ml-[10px] hidden lg:flex lg:gap-x-12 overflow-x-auto py-[14px]">
        {tagsAvailable && (
          <div className='flex space-x-4'>
            {tagsAvailable.map((item) => (
              <a
                key={item.key}
                className=" font-bold leading-6 text-white hover:text-cyan-500 text-lg hover:transition ease-in-out duration-300 hover:-translate-y-1 "
                style={{ whiteSpace: "nowrap" }}
              >
                |{item.key}|
              </a>
          ))}
          </div>
        )}
      </div>
    </div>
  </>
  );
};

export default Tags;
