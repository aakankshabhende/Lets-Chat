import React from 'react';

//import onlineIcon from '../../icons/onlineIcon.png';

import './AvailableUsers.css';

const AvailableUsers = ({ users }) => (
  <div className="textContainer">
    {
      users
        ? (
          <div>
            <h2>Lets's Chat <span role="img" aria-label="emoji">💬</span></h2>
            <h3>Online Members:</h3>
            <div className="activeContainer">
              <h3>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name} &nbsp;
                    <i style={{fontSize:'15px', color:'green'}} className="fa-solid fa-circle"></i>
                  </div>
                ))}
              </h3>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default AvailableUsers;