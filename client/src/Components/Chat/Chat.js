import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import io from "socket.io-client";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TitleBar from "../TitleBar/TitleBar";
import AvailableUsers from '../AvailableUsers/AvailableUsers'
// import queryString from 'query-string';

import './Chat.css';


let socket;
const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState('');
  
  const ENDPOINT = "http://localhost:5000";

  let navigate = useNavigate();
  
  //console.log("c",socket);

  useEffect(() =>{
  //  const { name, room } = queryString.parse(location.search);
    const name = localStorage.getItem('name');
    const room = localStorage.getItem('room');

    setName(name);
    setRoom(room);

  
  socket = io('http://localhost:5000');
  socket.on("connect", () => {
    if (socket.id != undefined){
      console.log("connect wala", socket.id);
      socket.emit('join', { name, room }, ({error}) => {
        alert("Username already exists!");
        navigate('/');
      });
    }
  });    
  }, []);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

}, []);


  const sendMessage = (event) => {
    event.preventDefault();
    console.log(message)
     if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
  return (
    <>
      <div className="outerContainer">
      <div className="container">
          <TitleBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <AvailableUsers users={users}/>
    </div>
    </>
  )
}

export default Chat