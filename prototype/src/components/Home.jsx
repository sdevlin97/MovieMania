import React from "react";
import Aboutus from "./Aboutus";

function Home() {
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
            MovieMania
          </h1>
        </div>
        <div className="my-20 flex items-center justify-center absolute h-screen w-full "></div>
      </div>
      <Aboutus></Aboutus>
    </>
  );
}

export default Home;
