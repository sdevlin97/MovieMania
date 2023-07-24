import React from "react";

function Pop(props) {
  return props.trigger ? (
    <div className="z-50 fixed top-0 left-0 w-full h-screen justify-center items-center flex">
      <div className="bg-white relative p-8 w-full max-w-max">
        <button
          onClick={() => props.setTrigger(false)}
          className="text-red-500 absolute top-0 right-0 px-2"
        >
          X
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Pop;
