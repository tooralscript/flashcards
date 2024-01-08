import React, { useState, useEffect } from "react";
import style from "../styles/Flashcards.module.css";
import axios from "axios";
import Card from "./Card";

export default function Flashcards() {


  const [data, setData] = useState([]);
  const [newCardWindow, setNewCardWindow] = useState(false);

  let nextCardId = 0;

  const [frontText,setFrontText] = useState("");
  const [backText,setBackText] = useState("");
  const [cardStatus,setCardStatus] = useState("Want to Learn");
  const [searchText, setSearchText] = useState("");


  function sendData(){

    let dateCardCreated = new Date();
    dateCardCreated.setHours(dateCardCreated.getHours() + 4);
    console.log(dateCardCreated.getTime());

    console.log(cardStatus);

      axios.post("http://localhost:3000/cards", {
        "id": nextCardId,
        "currentSide": "front",
        "frontText": frontText,
        "backText": backText,
        "dateCreated": dateCardCreated,
        "dateUpdated" : "no updates yet",
        "currentStatus": cardStatus
      });

      setFrontText("");
      setBackText("");
      setCardStatus("Want to Learn");

  }

  function handleClick(){
    setNewCardWindow(!newCardWindow);
  }

  async function getData() {
    try {
      const response = await axios.get("http://localhost:3000/cards");
      setData(response.data);
      nextCardId = response.data.length + 1;
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function sendThenGetData(){
    try{
      await sendData();
      await getData()
    }catch (error){
      console.error("This error ocured - " + error);
    }
  }

  async function getDataBasedOnSearch(text) {
    try {
      const response = await axios.get("http://localhost:3000/cards");
      let neededData = response.data.filter((e)=>e.frontText.toLowerCase().includes(text.toLowerCase())||e.backText.toLowerCase().includes(text.toLowerCase()));
      setData(neededData);
      nextCardId = response.data.length + 1;
      console.log("Current cards in JSON server - " + response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function getDataBasedOnSatus(status) {
    try {
      const response = await axios.get("http://localhost:3000/cards");

      if(status == "All"){
        var neededData = response.data;
      }else{
        var neededData = response.data.filter((e)=>(e.currentStatus.toLowerCase() == status.toLowerCase()));
      }
      
      setData(neededData);
      nextCardId = response.data.length + 1;
      console.log("Current cards in JSON server - " + response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  useEffect(() => {
    getData();
  }, []);

  return (
    <div  className={style.container}>

      <div className={style.cardManager}>
        <div>
        <input type="search" onChange={(e)=>{
          setSearchText(e.target.value);
        }} />
        <button onClick={()=>{
          getDataBasedOnSearch(searchText);
        }}>Search</button>
        </div>
        <button onClick={handleClick}>Add card</button>
        <label className={style.filterLabel} htmlFor="filtrParameter">Filter by status: </label>
        <select name="parameter" id="filterParameter" onChange={(e)=>{getDataBasedOnSatus(e.target.value)}}>
          <option value="All">All</option>
          <option value="Learned">Learned</option>
          <option value="Want to Learn">Want to Learn</option>
          <option value="Noted">Noted</option>
        </select>
        
        
      </div>

      <div style={{display : newCardWindow ? "flex" : "none"}} className={style.newCard}>
        <div>
        <label htmlFor="frontText">Enter the question: </label>
        <input required value={frontText} type="text" id="frontText" onChange={(e)=>{
          setFrontText(e.target.value);
        }} />
        </div>
        <div>
        <label htmlFor="backText">Enter the answer: </label>
        <input required value={backText} type="text" id="backText" onChange={(e)=>{
          setBackText(e.target.value);
        }}  />
        </div>
        <div>
          <label htmlFor="status">Choose the status</label>
          <select value={cardStatus} name="status" id="status" onChange={(e)=>{
            setCardStatus(e.target.value);
          }}>
            <option value="Want To Learn">Want To Learn</option>
            <option value="Learned">Learned</option>
            <option value="Noted">Noted</option>
          </select>
        </div>
        <button className={style.createButton} onClick={()=>{
          if(frontText !== "" && backText !== ""){

          sendThenGetData()
          setNewCardWindow(!newCardWindow);
          }else{
            alert("Fill in the blanks");
          }
          
          console.log("send clicked");
          }}>Create</button>
      </div>

      <div style={{display : newCardWindow ? "none" : "flex"}}>
      {data.map((e, index) => {
        return <Card key={index} cardId={e.id} frontText={e.frontText} backText={e.backText} dateCreated={e.dateCreated} dateUpdated={e.dateUpdated} currentStatus={e.currentStatus} nextCardId={nextCardId} callGetData={getData}/>;
      })}
      </div>

      
    </div>
  );
}
