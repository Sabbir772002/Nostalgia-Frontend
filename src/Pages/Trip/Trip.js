import React, { useState } from 'react';
import Triplist from './Triplist';
import Left from "../../Components/LeftSide/Left";
import Nav from '../../Components/Navigation/Nav';
import '../styles/ModernUI.css';

const Trip = () => {
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
        <Triplist />
      </div>
    </div>
  );
};

export default Trip;