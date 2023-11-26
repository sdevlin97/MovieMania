import { useState } from "react";
import Nav from "./components/Nav";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Recommendations from "./components/Recommendations";
import MyList from "./components/MyList";
import Details from "./components/Details";
import Browse from "./components/Browse";
import WatchList from "./components/WatchList";

function App() {
  return (
    <>
      <Router>
        <Nav></Nav>
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Recommendations" element={<Recommendations />} />
            <Route path="/MyList" element={<MyList />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/Browse" element={<Browse />} />
            <Route path="/WatchList" element={<WatchList />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
