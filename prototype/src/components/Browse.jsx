import { Parallax } from "react-parallax";
import Tags from "./Tags";

function Browse() {
  return (
    <>
      <Parallax
        bgImage="./pawel-czerwinski-XM1YUUVXj64-unsplash.jpg"
        strength={800}
        className="relative h-screen bg-black"
      >
        <div className="text-white flex items-center h-20 p-2 lg:px-4">
          Tags:
          <Tags></Tags>
        </div>
      </Parallax>
    </>
  );
}

export default Browse;
