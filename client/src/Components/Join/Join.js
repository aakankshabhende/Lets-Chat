import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
 
  localStorage.setItem('name', name);
  localStorage.setItem('query', `/chat?name=${name}&room=${room}`);
  useEffect(() => {
    localStorage.setItem('room', room);
  }, [room]);
  useEffect(() => {
    localStorage.setItem('name', name);
  }, [name]);
  useEffect(() => {
    localStorage.setItem('query', `/chat?name=${name}&room=${room}`);
  }, [name], [room]);

  return (
    <>
    <div class="split left">  
</div>

<div class="split right">
  
  <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Let's Chat</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" style={{borderRadius:"40px"}} onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" style={{borderRadius:"40px"}} onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
      
          <button className={'button mt-20'} type="submit">Join</button>
        </Link>
      </div>
    
  </div>
</div>
    
    </>
  )
}

export default Join