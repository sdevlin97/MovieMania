import { Parallax } from "react-parallax";
import { Link } from "react-router-dom";
import Pop from "./Pop";
import { useState } from "react";

function Partone() {
  const [ButtonPopup, setButtonPopup] = useState(false);
  return (
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
      <div className="my-20 flex items-center justify-center absolute h-screen w-full">
        <button
          onClick={() => setButtonPopup(true)}
          className="z-50 bg-transparent hover:bg-cyan-600 text-cyan-500 font-semibold hover:text-white py-2 px-4 border border-cyan-500 border-4 hover:border-transparent rounded-full text-[24px] hover:transition ease-in-out duration-300 hover:-translate-y-1"
        >
          Log In<i className="fa-solid fa-right-to-bracket ml-2"></i>
        </button>
        <Pop trigger={ButtonPopup} setTrigger={setButtonPopup}>
          <h1>popup</h1>
          <p>Future Log on form</p>
        </Pop>
        <button
          onClick={() => setButtonPopup(true)}
          className="ml-4 z-50 bg-transparent hover:bg-cyan-600 text-cyan-500 font-semibold hover:text-white py-2 px-4 border border-cyan-500 border-4 hover:border-transparent rounded-full text-[24px] hover:transition ease-in-out duration-300 hover:-translate-y-1"
        >
          Sign Up<i className="fa-solid fa-user-plus ml-2"></i>
        </button>
        <Pop trigger={ButtonPopup} setTrigger={setButtonPopup}>
          <h1>popups</h1>
          <p>Future Log on form</p>
        </Pop>
      </div>
    </Parallax>
  );
}
export default Partone;