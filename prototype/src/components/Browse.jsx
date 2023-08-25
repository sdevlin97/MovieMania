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
        <div className=" h-m-[5] grid grid-flow-col gap-4">
          ssss
          <div>
            <Card></Card>
          </div>
          sss
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
