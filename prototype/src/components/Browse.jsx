import { Parallax } from "react-parallax";
import Card from "./Card";

function Browse() {
  return (
    <>
      <Parallax
        bgImage="./pawel-czerwinski-XM1YUUVXj64-unsplash.jpg"
        strength={800}
        className="relative h-screen bg-black"
      >
        <div className=" my-[300px] grid grid-flow-col gap-4  justify-center ">
          <div>
            <Card></Card>
          </div>

          <div>
            <Card></Card>
          </div>
          <div>
            <Card></Card>
          </div>
          <div>
            <Card></Card>
          </div>

          <div>
            <Card></Card>
          </div>
          <div>
            <Card></Card>
          </div>
        </div>
      </Parallax>
    </>
  );
}

export default Browse;
