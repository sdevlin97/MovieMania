import { Parallax } from "react-parallax";

const Parttwo = () => (
  <Parallax
    blur={0}
    bgImage="./tech-daily-PGuCnUzsRSM-unsplash.jpg"
    strength={800}
    className="relative h-screen bg-black"
  >
    <div className="flex items-center justify-center absolute h-screen w-full">
      <span className=" text-white p-4 tracking-[.50em] text-lg bg-slate-600 ">
        Hello
      </span>
    </div>
  </Parallax>
);

export default Parttwo;
