import { Parallax } from "react-parallax";
import { Link } from "react-router-dom";

const Partone = () => (
  <Parallax
    blur={0}
    bgImage="./felix-mooneeram-evlkOfkQ5rE-unsplash.jpg"
    strength={800}
    className="relative h-screen"
  >
    <div className="flex items-center justify-center absolute h-screen w-full">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Button
      </button>
    </div>
  </Parallax>
);

export default Partone;
