import React from "react";

const Modal = (props) => {
  return props.isOpen ? (
    <div
      className="fixed inset-0 w-full bg-black bg-opacity-60 flex justify-center items-center z-50 overflow-hidden"
      onClick={props.toggleModal}
    >
      <div className="relative rounded-lg shadow-lg w-11/12 max-w-6xl h-[50rem]">
        {props.children}
      </div>
    </div>
  ) : null;
};

export default Modal;
