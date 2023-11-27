import React from "react";
import WatchListCard from "./WatchListCard";

const WatchList = () => {
  return (
    <div
      className="relative h-screen pt-20 backdrop-blur"
      style={{
        backgroundImage: `url('./pawel-czerwinski-XM1YUUVXj64-unsplash.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        color: "white",
      }}
    >
      <h1 className="tracking-[.50em] font-bold text-center text-[30px] text-white pb-10">
        Watchlist
      </h1>
      <WatchListCard />
    </div>
  );
};

export default WatchList;
