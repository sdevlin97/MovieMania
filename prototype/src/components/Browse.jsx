import { Parallax } from "react-parallax";
import Tags from "./Tags";
import SelectedTags from "./SelectedTags";

function Browse() {
  return (
    <>
      <Parallax
        bgImage="./pawel-czerwinski-XM1YUUVXj64-unsplash.jpg"
        strength={800}
        className="relative h-screen bg-black"
      >
        <div className="text-white flex items-center h-20 p-2 lg:px-4 bg-black">
          Tags:
          <Tags></Tags>
        </div>
        <div className="text-white flex items-center h-20 p-2 lg:px-4 bg- bg-black">
          Selected Tags:
          <SelectedTags></SelectedTags>
        </div>
        <div className="bg-black"></div>
      </Parallax>
    </>
  );
}

export default Browse;
