import React, { useEffect } from 'react'
import style from "../styles/Card.module.css";
import { useState, useRef } from 'react';
import axios from "axios";

export default function Card({frontText,backText,dateCreated,dateUpdated,currentStatus,nextCardId,cardId,callGetData}) {

  const spanRef = useRef(null);


  const [newFrontText,setNewFrontText] = useState("");
  const [newBackText, setNewBackText] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const [editing,setEditing] = useState(false);

  const [frontSide,setFrontSide] = useState(true);
  const [flip,setFlip] = useState(false);


  function sendEditedData(){

    dateUpdated = new Date();
    dateUpdated.setHours(dateUpdated.getHours() + 4);

    console.log(newFrontText);
    console.log(newBackText);

    axios.patch(`http://localhost:3000/cards/${cardId}`, {
      "frontText": newFrontText !== "" ? newFrontText : frontText,
      "backText" : newBackText !== "" ? newBackText : backText,
      "currentStatus" : newStatus !== "" ? newStatus : currentStatus,
      "dateUpdated" : dateUpdated
    });

}

   function deleteCard(){
    // console.log("delete button is clicked");
    axios.delete(`http://localhost:3000/cards/${cardId}`).then(() => callGetData());
   }

   useEffect(()=>{
    if(newFrontText !== ""){
      sendEditedData();
    }
   },[newFrontText])

   useEffect(()=>{
    if(newBackText !== ""){
      sendEditedData();
    }
   },[newBackText])

   useEffect(()=>{
    if(newStatus !== ""){
      sendEditedData();
    }
   },[newStatus])

   useEffect(()=>{
    spanRef.current.focus();
   },[editing])
  

  function handleClick(){
    setFrontSide(!frontSide);
    setFlip(!flip);
  }

function handleStatusChange(val){
  setNewStatus(val);
}
function handleEdit(val){
    if(frontSide){
      console.log("front deyishdi");
      setNewFrontText(val);
    }else{
      console.log("back deyishdi");
      setNewBackText(val);
    }
}

function handleEditing(){
  setEditing(!editing);
  callGetData();
  
}

  return (
    <div style={{transform : flip ? "rotateX(180deg)" : "" }} className={style.card}  >

      <div className={style.cardButtons} style={{transform : flip ? "rotateX(180deg)" : "" , bottom : flip ? "20px" : ""  }} >
      <button onClick={handleEditing}>
        {editing ? "Save" : "Edit"}
      </button>
      <button onClick={deleteCard}>Delete</button>
      </div>

      <div style={{display: frontSide ? "flex" : "none"}}>
      <span>Date created: {dateCreated}</span>
      <span>Date updated: {dateUpdated}</span>
      <span style={{display : editing ? "none" : "inline"}}>Current status: {currentStatus}</span>
      <div style={{display : editing ? "flex" : "none"}}>
      <label htmlFor="status">Select status: </label>
      <select name="status" id="status" onChange={(e)=>{
        handleStatusChange(e.target.value);
      }}>
        <option value="Want to Learn">Want to Learn</option>
        <option value="Learned">Learned</option>
        <option value="Noted">Noted</option>
      </select>
      </div>
      
      </div>

      <span ref={spanRef}  contentEditable= {editing ? "true" : "false"} suppressContentEditableWarning={true}  style={{transform : flip ? "rotateX(180deg)" : ""}} onInput={(e)=>{
        handleEdit(e.currentTarget.textContent);
        console.log(e.currentTarget.textContent);

      }}>
        {frontSide ?  frontText : backText}
      </span>
      

      <button style={{display: frontSide ? "block" : "none"}} onClick={handleClick}>Answer!</button>
      <button style={{display: frontSide ? "none" : "block" , transform : flip ? "rotateX(180deg)" : "", top : "20px"}} onClick={handleClick}>Question?
      </button>
    </div>
  )
}
