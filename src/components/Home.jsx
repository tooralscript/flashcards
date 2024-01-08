import React from 'react'
import style from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={style.container}>
      <span>Welcome!</span>
      <span>This web site is designed and built as a part of Assignment 3 for Web & Mobile 1 course.</span>
      <span>My name is Tural Hasanov, I am 19 years old, and I am highly interested in Frontend Development.</span>


      <div className={style.projects}>
        <span>My projects</span>
        <div className={style.projectsBoxContainer}>
          <div className={style.box}>
            <span>MeisterTask</span>
            <a href="https://tooralscript.github.io/meister-task/" target='_blank'>Have a look!</a>
          </div>
          <div className={style.box}>
          <span>Word counter</span>
            <a href="https://tooralscript.github.io/word-counter/" target='_blank'>Have a look!</a>
          </div>
          <div className={style.box}>
          <span>PDC</span>
            <a href="https://tooralscript.github.io/pdc/" target='_blank'>Have a look!</a>
          </div>
        </div>
      </div>

      <div className={style.skills}>
        <span>My skills</span>
        <div className={style.skillsBoxContainer}>
        <i class="fa-brands fa-html5 fa-beat" ></i>
        <i class="fa-brands fa-js fa-beat"></i>
        <i class="fa-brands fa-react fa-beat"></i>
        <i class="fa-brands fa-bootstrap fa-beat"></i>
        <i class="fa-brands fa-sass fa-beat"></i>
        </div>
      </div>
    </div>
  )
}
