import React, { useState, useEffect } from 'react';
import Left from '../../Components/LeftSide/Left';
import Nav from '../../Components/Navigation/Nav';
import "./Compare.css";
import CompareBox from "./CompareBox";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../../util/api';

const Compare = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState({});
  const [following, setFollowing] = useState(3);
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!username) return;
      try {
        const response = await axios.get(`${api.url}:8001/profile/${username}`, {
          params: {
            username: username,
            user: username
          },
        });
        if (response.status === 200) {
          setUserData(response.data || {});
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <div className='interface'>
      <Nav
        search={search}
        setSearch={setSearch}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      <div className="home">
        <Left 
          following={following}
          setFollowing={setFollowing}
        />
        <CompareBox
          userData={userData}
        />
      </div>
    </div>
  );
};

export default Compare;