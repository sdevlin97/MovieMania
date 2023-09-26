import { useState } from "react";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Recommendations from "./components/Recommendations";
import MyList from "./components/MyList";
import Details from "./components/Details";

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
            <Route path="/details" element={<Details />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
