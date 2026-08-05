import React, { useState, useEffect, useCallback } from 'react';
import "./Home.css";
import axios from 'axios';
import Left from "../../../Components/LeftSide/Left";
import Middle from "../../../Components/GMiddle/Middle";
import Nav from '../../../Components/Navigation/Nav';
import Right from '../../../Components/GroupRight/Right';
import api from '../../../util/api';

const GroupHome = () => {
  const rawUser = JSON.parse(localStorage.getItem('userData')) || {};
  const activeUsername = rawUser.username ? (rawUser.username.includes('@') ? rawUser.username.split('@')[1] : rawUser.username) : '';
  const userData = { ...rawUser, username: activeUsername };

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const fetchPosts = useCallback(() => {
    if (!userData.username) return;
    axios.get(`${api.url}:8001/gt_post`, {
      params: {
        username: userData.username
      }
    })
    .then(response => {
      setPosts(response.data || []);
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
  }, [userData.username]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const fetchOverseerList = () => {
    if (!userData.id) return;
    axios.get(`${api.url}:8001/my_groups`, {
      params: {
        user_id: userData.id
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  };

  return (
    <div className='interface'>
      <Nav 
        search={search}
        setSearch={setSearch}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      <div className="home">
        <Left />
        <Middle posts={posts} fetchPosts={fetchPosts} />
        <Right fetchOverseerList={fetchOverseerList} />
      </div>
    </div>
  );
};

export default GroupHome;