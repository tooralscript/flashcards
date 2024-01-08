import React from "react";
import Header from "./components/Header";
import style from "./App.module.css";
import Home from "./components/Home"
import Flashcards from "./components/Flashcards"
import Contact from "./components/Contact"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <Router>
        <Header />

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/flashcards" element={<Flashcards />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
          </Routes>

          {/* <Footer/> */}
      </Router>
    </>
  );
}
