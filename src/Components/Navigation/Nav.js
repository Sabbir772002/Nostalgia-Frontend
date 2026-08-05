import React, { useState } from 'react';
import "../Navigation/Nav.css";
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHome } from "react-icons/ai";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { IoNotificationsOutline } from "react-icons/io5";
import { TbMessage } from "react-icons/tb";
import axios from 'axios';
import ServerUrl, { getImageUrl } from '../../api/serverUrl';
import ProfileDefaultImg from "../../assets/profile.jpg";

const Nav = ({ setPosts, setShowMenu, profileImg }) => {
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handlemsg = (e) => {
    e.preventDefault();
    if (setPosts === undefined) navigate("/home");
    if (setPosts === undefined) return;
    if (search === "") setSearch(" ");
    axios.get(`${ServerUrl.BASE_URL}search`, { 
      params: {
        search: search,
        username: userData.username
      }
    }).then(response => {  
      setPosts(response.data);
    }).catch(console.error);
  };

  const avatarSrc = getImageUrl(userData.p_image || userData.pp || profileImg);

  return (
    <nav className='m-0'>
      <div className="n-logo">
        <Link to="/home" className='logo' style={{ color: "black", textDecoration: "none" }}>
          <h1>Nos<span>talgia</span></h1>
        </Link>
      </div>
      <div className="n-form-button">
        <form className='n-form' onSubmit={handlemsg}>
          <SearchIcon className='search-icon'/>
          <input 
            type="text" 
            placeholder='Search post'
            id='n-search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <div className="social-icons">
        <Link to="/home" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <AiOutlineHome className='nav-icons'/>
        </Link>
        <Link to="/notification" id='notifi' style={{ marginTop: "8px" }}><IoNotificationsOutline className='nav-icons'/></Link>
        <Link to="/chat" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <TbMessage className='nav-icons'/>
        </Link>
        <Link to="/friend" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <LiaUserFriendsSolid
            className='nav-icons'
            onClick={() => setShowMenu && setShowMenu(true)}
          />
        </Link>
      </div>

      <div className="n-profile">
        <Link to={`/profile/${userData.username || ''}`}>
          <img
            src={avatarSrc}
            className='n-img'
            alt="profile"
            style={{ marginBottom: "-7px", width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = ProfileDefaultImg;
            }}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;