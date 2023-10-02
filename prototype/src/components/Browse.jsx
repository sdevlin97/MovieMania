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
          <h1 className="tracking-[.50em] font-bold text-center text-[30px]">
            Trending
          </h1>
          <Card></Card>
        </div>
        <div className="backdrop-blur ">
          <h1 className="tracking-[.50em] font-bold text-center text-[30px]">
            Top Rated
          </h1>
          <Card></Card>
        </div>
        <div className="backdrop-blur ">
          <h1 className="tracking-[.50em] font-bold text-center text-[30px]">
            New Releases
          </h1>
          <Card></Card>
        </div>
      </div>
    </>
  );
}

export default Browse;
