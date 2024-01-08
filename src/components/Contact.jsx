import React, { useState } from 'react';
import style from "../styles/Contact.module.css";
import axios from 'axios';

export default function Contact() {


  const [mail, setMail] = useState({
    subject: "",
    emailAddress: "",
    message: ""
  });

  let nextMessageId = 0;

  axios.get("http://localhost:3000/messages").then((res) => {
    nextMessageId = res.data.length + 1;
    console.log("The id of the next message is - " + nextMessageId);
  });

  function axiosPost() {
    axios.post("http://localhost:3000/messages", {
      'id': nextMessageId,
      'subject': mail.subject,
      'senderEmail': mail.emailAddress,
      'content': mail.message
    });
  }

  function handleClick() {
    // if(mail.subject == "" || mail.emailAddress == "" || mail.message == "" ){
    //   console.log("empty inputs");
    // }

    
    axiosPost();
    console.log(mail);
    setMail({
      subject: "",
      emailAddress: "",
      message: ""
    });
  }


  return (
    <div className={style.container}>
      <div>
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          value={mail.subject}
          onChange={(e) => {
            setMail({ ...mail, subject: e.target.value });
            console.log(mail);
          }}
        />
      </div>
      <div>
        <label htmlFor="email">Email address</label>
        <input
          type="text"
          id="email"
          value={mail.emailAddress}
          onChange={(e) => {
            setMail({ ...mail, emailAddress: e.target.value });
          }}
        />
      </div>
      <div>
        <label htmlFor="content">Your message</label>
        <textarea
          type="text"
          id="content"
          value={mail.message}
          onChange={(e) => {
            setMail({ ...mail, message: e.target.value });
          }}
        />
      </div>
      <div>
        <button onClick={handleClick}>
          Send
        </button>
      </div>
    </div>
  )
}
