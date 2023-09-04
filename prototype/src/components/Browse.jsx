import { Parallax } from "react-parallax";
import Tags from "./Tags";
import SelectedTags from "./SelectedTags";
import Card from "./Card";

function Browse() {
  return (
    <>
      <Parallax
        bgImage="./pawel-czerwinski-XM1YUUVXj64-unsplash.jpg"
        strength={800}
        className="relative h-screen bg-black"
      >
        <div className="text-white flex items-center h-20 p-2 lg:px-4 bg-black ">
          Tags:
          <Tags></Tags>
        </div>
        <div className="text-white flex items-center h-20 p-2 lg:px-4 bg- bg-black">
          Selected Tags:
          <SelectedTags></SelectedTags>
        </div>
        <div className="backdrop-blur ">
          <Card></Card>
        </div>
        <div className="flex flex-col items-center justify-center mt-4">
          <input
            type="text"
            placeholder="Enter a name for the list"
            className="bg-white p-2 rounded-md shadow-md"
          />
          <button className="bg-blue-500 text-white rounded-md mt-2 px-20 py-4">
            Save
          </button>
        </div>
      </Parallax>
    </>
  );
}

export default Browse;
