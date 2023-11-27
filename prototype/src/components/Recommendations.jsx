// Recommendations.jsx
import React, { useState } from "react";
import Tags from "./Tags";
import SelectedTags from "./SelectedTags";
import Card from "./Card";
<<<<<<< HEAD
// SelectedTags is the same component as Tags, just to differ them here since they have diffrent hard coded data
=======
// SelectedTags is the same component has Tags, just to differ them here since they have diffrent hard coded data

const AllTags = [
  { name: "Superhero" },
  { name: "Adventure" },
  { name: "Action" },
  { name: "Dark" },
  { name: "DC" },
  { name: "Marvel" },
  { name: "Comic" },
  { name: "Secret" },
  { name: "Romance" },
  { name: "Science Fiction" },
  { name: "Fantasy" },
  { name: "Horror" },
  { name: "Comedy" },
  { name: "Drama" },
  { name: "Thriller" },
  { name: "Mystery" },
  { name: "Animation" },
  { name: "Family" },
  { name: "Historical" },
  { name: "Western" },
  { name: "Musical" },
  { name: "War" },
  { name: "Spy" },
  { name: "Post-Apocalyptic" },
  { name: "Time Travel" },
  { name: "Aliens" },
  { name: "Robots" },
  { name: "Magical" },
  { name: "Sports" },
  { name: "Heist" },
  { name: "Supernatural" },
  { name: "Coming of Age" },
  { name: "Disaster" },
];

>>>>>>> origin/main
function Recommendations() {
  const containerStyle = {
    backgroundImage: `url('./pawel-czerwinski-XM1YUUVXj64-unsplash.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
  };

  const [availableTags, setAvailableTags] = useState(AllTags);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagClick = (tagName, action) => {
    if (action === "add") {
      setSelectedTags([...selectedTags, tagName]);
      setAvailableTags(availableTags.filter((tag) => tag.name !== tagName));
    } else if (action === "remove") {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagName));
      setAvailableTags([...availableTags, { name: tagName }]);
    }
  };

  return (
    <>
      <div style={containerStyle} className="relative bg-black">
        <div className="text-white flex items-center h-20 p-2 lg:px-4 bg-black ">
          Tags:
          <Tags
            availableTags={availableTags}
            selectedTags={selectedTags}
            onTagClick={handleTagClick}
          />
        </div>
        <div className="text-white flex items-center h-20 p-2 lg:px-4 bg- bg-black">
          Selected Tags:
          <SelectedTags
            selectedTags={selectedTags}
            onTagClick={handleTagClick}
          />
        </div>
        <div className="backdrop-blur ">
<<<<<<< HEAD
        <Card category="popular" /> {/* Display "Trending" movies by default */}
=======
          <Card />
>>>>>>> origin/main
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
