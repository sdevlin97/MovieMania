import React, { useState, useEffect } from "react";
import MadeList from "./MadeList";
//DevTag is a diffrent way to get tags , you can remove it and use Tags component only or same in reverse
import DevTag from "./DevTag";
import Card from "./Card";
import { auth, checkLoginState, db } from "../firebase.js";
import { collection, doc, getDocs } from "firebase/firestore";

// const SavedList = [
//   {
//     name: "Friend and me",
//     nametags: [
//       "Mind-Bending",
//       "Epic Romance",
//       "Sci-Fi Action",
//       "Quentin Tarantino",
//       "Time Travel",
//       "Thriller",
//       "Alternate Reality",
//       "Existential",
//       "Dystopian",
//       "Cyberpunk",
//       "Art House",
//       "Surreal",
//       "Mind-Bending",
//       "Epic Romance",
//       "Sci-Fi Action",
//       "Quentin Tarantino",
//       "Time Travel",
//       "Thriller",
//       "Alternate Reality",
//       "Existential",
//       "Dystopian",
//       "Cyberpunk",
//       "Art House",
//       "Surreal",
//     ],
//   },
//   {
//     name: "Kids Fav",
//     nametags: [
//       "Sci-Fi Fantasy",
//       "Dinosaur Adventure",
//       "Space Opera",
//       "Alien Invasion",
//       "Superpowers",
//       "Robots",
//       "Post-Apocalyptic",
//       "Virtual Reality",
//       "Extraterrestrial",
//       "Steampunk",
//       "Mythology",
//       "Time Loop",
//       "Sci-Fi Fantasy",
//       "Dinosaur Adventure",
//       "Space Opera",
//       "Alien Invasion",
//       "Superpowers",
//       "Robots",
//       "Post-Apocalyptic",
//       "Virtual Reality",
//       "Extraterrestrial",
//       "Steampunk",
//       "Mythology",
//       "Time Loop",
//     ],
//   },
//   {
//     name: "Crime Tags",
//     nametags: [
//       "Prison Drama",
//       "Mafia Crime",
//       "Undercover Cop",
//       "Heist",
//       "Organized Crime",
//       "Gangster",
//       "Neo-Noir",
//       "Corruption",
//       "Betrayal",
//       "Revenge",
//       "Psychological",
//       "Caper",
//       "Prison Drama",
//       "Mafia Crime",
//       "Undercover Cop",
//       "Heist",
//       "Organized Crime",
//       "Gangster",
//       "Neo-Noir",
//       "Corruption",
//       "Betrayal",
//       "Revenge",
//       "Psychological",
//       "Caper",
//     ],
//   },
//   {
//     name: "Heros",
//     nametags: [
//       "Superhero",
//       "Coming of Age",
//       "Animated",
//       "Mutants",
//       "High School",
//       "Inspirational",
//       "Teen Drama",
//       "Identity",
//       "Empowerment",
//       "Family",
//       "Supernatural",
//       "Friendship",
//       "Superhero",
//       "Coming of Age",
//       "Animated",
//       "Mutants",
//       "High School",
//       "Inspirational",
//       "Teen Drama",
//       "Identity",
//       "Empowerment",
//       "Family",
//       "Supernatural",
//       "Friendship",
//     ],
//   },
//   {
//     name: "For Later",
//     nametags: [
//       "Classic Comedy",
//       "Historical Drama",
//       "Mystery Thriller",
//       "Film Noir",
//       "Whodunit",
//       "Screwball Comedy",
//       "Satire",
//       "Political Intrigue",
//       "Conspiracy",
//       "Romantic Comedy",
//       "Action Adventure",
//       "Spy",
//       "Classic Comedy",
//       "Historical Drama",
//       "Mystery Thriller",
//       "Film Noir",
//       "Whodunit",
//       "Screwball Comedy",
//       "Satire",
//       "Political Intrigue",
//       "Conspiracy",
//       "Romantic Comedy",
//       "Action Adventure",
//       "Spy",
//     ],
//   },
// ];

const MyList = () => {
  const [lists, setLists] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRemoveList = (name) => {
    setLists((prevLists) => prevLists.filter((list) => list.name !== name));
  };

  const handleSelectTags = (tags) => {
    setSelectedTags(tags);
  };

  useEffect(() => {
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
        ) : data ? (
          <div style={containerStyle} className="relative bg-black">
            <div className="flex justify-center items-center text-lg text-white h-20 bg-black">
              <h1 className="font-bold text-[60px]">Saved List</h1>
            </div>

            {lists.map((object, index) => (
              <div
                key={index}
                className="text-white flex items-center h-20 p-2 lg:px-4 bg- bg-black"
              >
                <MadeList key={index}
                  savedName={index + 1}
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
              <Card></Card>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default MyList;
