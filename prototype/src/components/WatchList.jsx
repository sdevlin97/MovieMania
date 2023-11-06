import React from "react";

const WatchList = () => {
  const containerStyle = {
    backgroundImage: `url('./pawel-czerwinski-XM1YUUVXj64-unsplash.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  return (
    <div style={containerStyle} className="relative h-screen bg-black">
      <div className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-white font-serif font-bold text-center tracking-[.20em] sm:text-[50px] md:text-[100px] lg:text-[100px]">
          Future Watchlist...
        </h1>
      </div>
      {/* The next div seems to be empty and might not be needed */}
      <div className="my-20 flex items-center justify-center absolute h-screen w-full "></div>
    </div>
  );
};

export default WatchList;
