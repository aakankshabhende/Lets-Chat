import React from 'react';

//import onlineIcon from '../../icons/onlineIcon.png';
//import closeIcon from '../../icons/closeIcon.png';

import './TitleBar.css';

const TitleBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
    <i style={{color:'green'}} className="fa-solid fa-circle">&nbsp;</i>
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
    <a href="/"><i style={{color:'red', fontSize:'22px', backgroundColor:'white', borderRadius:'30px'}} className="fa-solid fa-circle-xmark"></i></a>
    </div>
  </div>
);

export default TitleBar;