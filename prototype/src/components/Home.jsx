import { useState } from "react";
import Aboutus from "./Aboutus";
import $ from "jquery";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function testBackendCall() {
  $.ajax({
    url: `https://us-central1-moviemania-ba604.cloudfunctions.net/app/test`,
    crossOrigin: true,
    type: "POST",
    async: true,
    success: function (response) {
      console.log("We've made a sucessful post request!");
      console.log("The response is: ", response);
    },
    error: function (error) {
      console.log("Something went wrong with our test");
      console.log("The error is: ");
      console.log(error);
    },
  });
}

async function testDatabaseRequest() {
  try {
    const docRef = await addDoc(collection(db, "movies"), {
      title: "Blade Runner",
      release_date: "06/25/1982",
      rating: 8.1,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function Home() {
  const [ButtonPopup, setButtonPopup] = useState(false);

  const containerStyle = {
    backgroundImage: `url('./pawel-czerwinski-XM1YUUVXj64-unsplash.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  return (
    <>
      <div style={containerStyle} className="relative h-screen bg-black">
        <div className="flex items-center justify-center absolute h-2/4 mt-20  w-full  -my-[100px]">
          <h1 className="flex tracking-[.20em] font-bold text-center font-serif text-cyan-500 sm:text-[50px] md:text-[100px] lg:text-[100px] ">
            Movie Mania
          </h1>
        </div>
        <div className="my-20 flex items-center justify-center absolute h-screen w-full "></div>
      </div>
      <Aboutus></Aboutus>
    </>
  );
}

export default Home;
