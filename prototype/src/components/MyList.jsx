import React, { useState, useEffect, useCallback } from "react";
import MadeList from "./MadeList";
//DevTag is a diffrent way to get tags , you can remove it and use Tags component only or same in reverse
import DevTag from "./DevTag";
import Card from "./Card";
import { auth, checkLoginState, db } from "../firebase.js";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { Slide, ToastContainer, toast } from "react-toastify";

const MyList = () => {
  const [lists, setLists] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              <Card></Card>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default MyList;
