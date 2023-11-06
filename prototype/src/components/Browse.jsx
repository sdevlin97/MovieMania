import Card from "./Card";

function Browse() {
  const containerStyle = {
    backgroundImage: `url('./pawel-czerwinski-XM1YUUVXj64-unsplash.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  return (
    <>
      <div style={containerStyle} className="relative bg-black">
        <div className="backdrop-blur ">
          <h1 className="tracking-[.50em] font-bold text-center text-[30px] text-white">
            Trending
          </h1>
          <Card category="popular" />
        </div>
        <div className="backdrop-blur ">
          <h1 className="tracking-[.50em] font-bold text-center text-[30px] text-white">
            Top Rated
          </h1>
          <Card category="topRated" />
        </div>
        <div className="backdrop-blur ">
          <h1 className="tracking-[.50em] font-bold text-center text-[30px] text-white">
            New Releases
          </h1>
          <Card category="newReleases" />
        </div>
      </div>
    </>
  );
}

export default Browse;
