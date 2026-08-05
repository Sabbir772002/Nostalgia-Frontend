import React, { useState, useEffect, useCallback } from 'react';
import Left from '../../../Components/LeftSide/Left';
import Gprofile from '../../../Components/GroupProfile/Gprofile';
import Right from '../../../Components/GroupRight/Right';
import Nav from '../../../Components/Navigation/Nav';
import "../Profile/Profile.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../../../util/api';

const GroupProfile = () => {
  const { username } = useParams();
  const user = JSON.parse(localStorage.getItem('userData')) || {};
  const [following, setFollowing] = useState(3);
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [profileImg] = useState("");
  const [group, setgroup] = useState("");
  const [posts, setPosts] = useState([]);

  const gprofile = useCallback(async () => {
    if (!username || !user.id) return;
    try {
      const response = await axios.get(`${api.url}:8001/g_profile/${username}`, {
        params: {
          user_id: user.id
        }
      });
      if (response.status === 200) {
        setgroup(response.data);
      }
    } catch (error) {
      console.error('Error fetching group data:', error);
    }
  }, [username, user.id]);

  useEffect(() => {
    gprofile();
  }, [gprofile]);

  const fetchPosts = useCallback(() => {
    if (!username) return;
    axios.get(`${api.url}:8001/gp_post`, {
      params: {
        username: username
      }
    })
    .then(response => {
      setPosts(response.data || []);
    })
    .catch(error => {
      console.error('Error fetching group posts:', error);
    });
  }, [username]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className='interface'>
        <Nav
        search={search}
        setSearch={setSearch}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        profileImg={profileImg}
        />
      <div className="home">
        <Left 
        following={following}
        setFollowing={setFollowing}
        profileImg={profileImg}
        group={group}
        
        />

        <Gprofile 
        group={group}
        setgroup={setgroup}
        gprofile={gprofile}
        fetchPosts={fetchPosts}
        posts={posts}
        setPosts={setPosts} 
        />
        
        <Right 
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        following={following}
        setFollowing={setFollowing}
        />
      </div>
    </div>
  )
}
export default GroupProfile;