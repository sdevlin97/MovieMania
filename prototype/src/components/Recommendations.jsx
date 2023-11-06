import Tags from "./Tags";
import SelectedTags from "./SelectedTags";
import Card from "./Card";
// SelectedTags is the same component as Tags, just to differ them here since they have diffrent hard coded data
function Recommendations() {
  const containerStyle = {
    backgroundImage: `url('./pawel-czerwinski-XM1YUUVXj64-unsplash.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
  };

  return (
    <>
      <div style={containerStyle} className="relative bg-black">
        <div className="text-white flex items-center h-20 p-2 lg:px-4 bg-black ">
          Tags:
          <Tags></Tags>
        </div>
        <div className="text-white flex items-center h-20 p-2 lg:px-4 bg- bg-black">
          Selected Tags:
          <SelectedTags></SelectedTags>
        </div>
        <div className="backdrop-blur ">
        <Card category="popular" /> {/* Display "Trending" movies by default */}
        </div>
        <div className="flex flex-col items-center justify-center pt-4 pb-20 backdrop-blur">
          <input
            type="text"
            placeholder="Enter a name for the list"
            className="bg-white p-2 rounded-md shadow-md"
          />
          <button className="bg-blue-500 text-white rounded-md mt-2 px-20 py-4">
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default Recommendations;
