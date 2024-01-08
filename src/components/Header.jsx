import React from "react";
import style from "../styles/Header.module.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className={style.container}>
      <NavLink exact="true" to="/">
        Home
      </NavLink>

      <NavLink exact="true" to="/flashcards">
        Flashcards
      </NavLink>

      <NavLink exact="true" to="/contact">
        Contact
      </NavLink>
    </div>
  );
}
