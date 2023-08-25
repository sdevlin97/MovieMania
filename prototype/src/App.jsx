import { useState } from "react";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Partone from "./components/Partone";
import Browse from "./components/Browse";

function App() {
  return (
    <>
      <Router>
        <Nav></Nav>
        <div className="">
          <Routes>
            <Route path="/" element={<Partone />} />
            <Route path="/Browse" element={<Browse />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
