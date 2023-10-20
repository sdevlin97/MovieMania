import { Link } from "react-router-dom";
import { useState } from "react";
import Aboutus from "./Aboutus";
import $ from "jquery";
import { ToastContainer } from 'react-toastify';

function Partone() {
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
      <div className="toast-container"><ToastContainer limit={2}/></div>
        <div className="flex items-center justify-center absolute h-2/4 mt-20  w-full  -my-[100px]">
          <h1 className="flex text-[100px] tracking-[.20em] font-bold text-center font-serif text-cyan-500 ">
            Movie Mania
          </h1>
        </div>
        <div className="my-20 flex items-center justify-center absolute h-screen w-full "></div>
      </div>
      <Aboutus></Aboutus>
    </>
  );
}

export default Partone;
