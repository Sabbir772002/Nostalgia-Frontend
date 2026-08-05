import React, { useState } from 'react';
import "./Buddy.css";
import Left from "../../Components/LeftSide/Left";
import Nav from '../../Components/Navigation/Nav';
import Eventlist from './Eventlist';

const Event = () => {
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='interface'>
      <Nav 
        search={search}
        setSearch={setSearch}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      <div className="hoi">
        <Left />
        <Eventlist />
      </div>
    </div>
  );
};

export default Event;