import { Parallax } from "react-parallax";
import { Link } from "react-router-dom";
import Logins from "./Logins";
import { useState } from "react";
import Aboutus from "./Aboutus";
import $ from 'jquery';
import {db} from '../firebase';
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
      }
  })
}

async function testDatabaseRequest() {
  try {
    const docRef = await addDoc(collection(db, "movies"), {
      title: "Blade Runner",
      release_date: "06/25/1982",
      rating: 8.1
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function Partone() {
  const [ButtonPopup, setButtonPopup] = useState(false);

  return (
    <>
      <Parallax
        bgImage="./pawel-czerwinski-XM1YUUVXj64-unsplash.jpg"
        strength={800}
        className="relative h-screen bg-black"
      >
        <div className="flex items-center justify-center absolute h-screen w-full  -my-[100px]">
          <h1 className="flex text-[100px] tracking-[.20em] font-bold text-center font-serif text-cyan-500 ">
            Movie Mania
          </h1>
        </div>
        <div className="my-20 flex items-center justify-center absolute h-screen w-full ">
          <button
            onClick={() => setButtonPopup(true)}
            className="  backdrop-blur-lg bg-transparent hover:bg-cyan-600 text-cyan-500 font-semibold hover:text-white py-2 px-4 border border-cyan-500 border-4 hover:border-transparent rounded-full text-[24px] hover:transition ease-in-out duration-300 hover:-translate-y-1"
          >
            Log In / Sign up
            <i className="fa-solid fa-right-to-bracket ml-2"></i>
          </button>
          <Logins trigger={ButtonPopup} setTrigger={setButtonPopup}></Logins>
        </div>
      </Parallax>
      <Aboutus></Aboutus>
    </>
  );
}
export default Partone;
