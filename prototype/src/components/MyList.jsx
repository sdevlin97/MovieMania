import React, { useState } from "react";
import { Parallax } from "react-parallax";
import MadeList from "./MadeList";
import DevTag from "./DevTag"; // Updated import statement

const SavedList = [
  {
    name: "list1",
    nametags: ["dog", "dog", "dog", "dog"],
  },
  {
    name: "list2",
    nametags: ["cat", "cat", "cat"],
  },
  {
    name: "list3",
    nametags: ["bird", "bird"],
  },
];

const MyList = () => {
  const [lists, setLists] = useState(SavedList);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleRemoveList = (name) => {
    setLists((prevLists) => prevLists.filter((list) => list.name !== name));
  };

  const handleSelectTags = (tags) => {
    setSelectedTags(tags);
  };

  return (
    <>
      <Parallax
        bgImage="./pawel-czerwinski-XM1YUUVXj64-unsplash.jpg"
        strength={800}
        className="relative h-screen bg-black"
      >
        {lists.map((list, index) => (
          <div
            key={index}
            className="text-white flex items-center h-20 p-2 lg:px-4 bg- bg-black"
          >
            <MadeList
              savedName={list.name}
              nametags={list.nametags}
              onRemove={handleRemoveList}
              onSelect={handleSelectTags}
            />
          </div>
        ))}
        <div className="text-white flex items-center h-20 p-2 lg:px-4 bg-black ">
          Selected Tags:
          <DevTag selectedTags={selectedTags} />
        </div>
      </Parallax>
    </>
  );
};

export default MyList;
