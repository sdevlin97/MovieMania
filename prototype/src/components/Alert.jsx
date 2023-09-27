import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function Alert(message) {
  const showAlert = () => {
    toast(`${message}`);
  };

  return (
    <button onClick={showAlert}>Show Alert</button>
  );
}

export default Alert;