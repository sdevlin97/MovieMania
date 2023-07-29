import { Parallax } from "react-parallax";
import Logins from "./Logins";
import { useState } from "react";

function Parttwo() {
  const [ButtonPopup, setButtonPopup] = useState(false);
  return (
    <Parallax
      blur={0}
      bgImage="./tech-daily-PGuCnUzsRSM-unsplash.jpg"
      strength={800}
      className="relative h-screen bg-black"
    >
      <div className="flex items-center justify-center absolute h-screen w-full">
        <button
          onClick={() => setButtonPopup(true)}
          className=" text-white p-4 tracking-[.50em] text-lg bg-slate-600 "
        >
          Hello
        </button>
        <Logins trigger={ButtonPopup} setTrigger={setButtonPopup}>
          <h1>popupssss</h1>
          <p>this is m y button trigger</p>
        </Logins>
      </div>
    </Parallax>
  );
}

export default Parttwo;
