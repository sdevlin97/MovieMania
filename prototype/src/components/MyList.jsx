import React, { useState } from "react";
import { Parallax } from "react-parallax";
import MadeList from "./MadeList";
import DevTag from "./DevTag"; // Updated import statement
import Card from "./Card";

const SavedList = [
  {
    name: "Freind and me",
    nametags: [
      "Mind-Bending",
      "Epic Romance",
      "Sci-Fi Action",
      "Quentin Tarantino",
      "Time Travel",
      "Thriller",
      "Alternate Reality",
      "Existential",
      "Dystopian",
      "Cyberpunk",
      "Art House",
      "Surreal",
      "Mind-Bending",
      "Epic Romance",
      "Sci-Fi Action",
      "Quentin Tarantino",
      "Time Travel",
      "Thriller",
      "Alternate Reality",
      "Existential",
      "Dystopian",
      "Cyberpunk",
      "Art House",
      "Surreal",
    ],
  },
  {
    name: "Kids Fav",
    nametags: [
      "Sci-Fi Fantasy",
      "Dinosaur Adventure",
      "Space Opera",
      "Alien Invasion",
      "Superpowers",
      "Robots",
      "Post-Apocalyptic",
      "Virtual Reality",
      "Extraterrestrial",
      "Steampunk",
      "Mythology",
      "Time Loop",
      "Sci-Fi Fantasy",
      "Dinosaur Adventure",
      "Space Opera",
      "Alien Invasion",
      "Superpowers",
      "Robots",
      "Post-Apocalyptic",
      "Virtual Reality",
      "Extraterrestrial",
      "Steampunk",
      "Mythology",
      "Time Loop",
    ],
  },
  {
    name: "Crime Tags",
    nametags: [
      "Prison Drama",
      "Mafia Crime",
      "Undercover Cop",
      "Heist",
      "Organized Crime",
      "Gangster",
      "Neo-Noir",
      "Corruption",
      "Betrayal",
      "Revenge",
      "Psychological",
      "Caper",
      "Prison Drama",
      "Mafia Crime",
      "Undercover Cop",
      "Heist",
      "Organized Crime",
      "Gangster",
      "Neo-Noir",
      "Corruption",
      "Betrayal",
      "Revenge",
      "Psychological",
      "Caper",
    ],
  },
  {
    name: "Heros",
    nametags: [
      "Superhero",
      "Coming of Age",
      "Animated",
      "Mutants",
      "High School",
      "Inspirational",
      "Teen Drama",
      "Identity",
      "Empowerment",
      "Family",
      "Supernatural",
      "Friendship",
      "Superhero",
      "Coming of Age",
      "Animated",
      "Mutants",
      "High School",
      "Inspirational",
      "Teen Drama",
      "Identity",
      "Empowerment",
      "Family",
      "Supernatural",
      "Friendship",
    ],
  },
  {
    name: "For Later",
    nametags: [
      "Classic Comedy",
      "Historical Drama",
      "Mystery Thriller",
      "Film Noir",
      "Whodunit",
      "Screwball Comedy",
      "Satire",
      "Political Intrigue",
      "Conspiracy",
      "Romantic Comedy",
      "Action Adventure",
      "Spy",
      "Classic Comedy",
      "Historical Drama",
      "Mystery Thriller",
      "Film Noir",
      "Whodunit",
      "Screwball Comedy",
      "Satire",
      "Political Intrigue",
      "Conspiracy",
      "Romantic Comedy",
      "Action Adventure",
      "Spy",
    ],
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
        className="relative bg-black"
        style={{ minHeight: "100vh" }}
      >
        <div className="flex justify-center items-center text-lg text-black h-20 bg-black">
          <h1 className="font-bold text-[60px]">Saved List</h1>
        </div>

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
          Selected: <DevTag selectedTags={selectedTags} />
        </div>
        <div className="backdrop-blur ">
          <Card></Card>
        </div>
      </Parallax>
    </>
  );
};

export default MyList;
