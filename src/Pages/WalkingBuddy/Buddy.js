import React, { useState } from 'react';
import BuddyList from './BuddyList';
import Left from "../../Components/LeftSide/Left";
import Nav from '../../Components/Navigation/Nav';
import '../styles/ModernUI.css';

const Buddy = () => {
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
      <div className="btw">
        <Left />
        <BuddyList />
      </div>
    </div>
  );
};

export default Buddy;