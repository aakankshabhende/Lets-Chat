import React from 'react';

import Chat from './Components/Chat/Chat';
import Join from './Components/Join/Join';

import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
    
      <Routes>
        <Route exact path="/" element={<Join/>}/>
        <Route path="/chat" element={<Chat/>} />
      </Routes>
    
    </>
    
  );
}

export default App;