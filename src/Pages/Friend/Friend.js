import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Fndbox from "./Fndlist";
import Left from "../../Components/LeftSide/Left";
import Nav from '../../Components/Navigation/Nav';
import api from '../../util/api';
import '../styles/ModernUI.css';

const Friend = () => {
  const rawUser = JSON.parse(localStorage.getItem('userData')) || {};
  const effectiveUsername = rawUser.username ? (rawUser.username.includes('@') ? rawUser.username.split('@')[1] : rawUser.username) : '';
  const [fndlist, setfndlist] = useState([]);
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const fetchfnd = useCallback(async () => {
    const numericUserId = rawUser.id;
    if (!numericUserId && !effectiveUsername) return;
    try {
      const response = await axios.get(`${api.url}:8001/friends`, {
        params: {
          user_id: numericUserId || effectiveUsername
        }
      });
      setfndlist(response.data.users || response.data || []);
    } catch (error) {
      console.error('Error fetching friends data:', error);
    }
  }, [rawUser.id, effectiveUsername]);

  useEffect(() => {
    fetchfnd();
  }, [fetchfnd]);

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
        <Fndbox
          fndlist={fndlist}
          setfndlist={setfndlist}
          fetchfnd={fetchfnd}
        />
      </div>
    </div>
  );
};

export default Friend;
