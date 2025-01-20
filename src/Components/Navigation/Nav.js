import React from 'react'
import "../Navigation/Nav.css"
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

import {AiOutlineHome} from "react-icons/ai"
import {LiaUserFriendsSolid} from "react-icons/lia"
import {IoNotificationsOutline} from "react-icons/io5"
import {TbMessage} from "react-icons/tb"
import {useState } from 'react';
import { useNavigate } from 'react-router';
import Profile from "../../assets/profile.jpg"
import axios from 'axios';
import api from '../../../../FundWave-Frontend-/util/api';
const Nav = ({setPosts,setShowMenu,profileImg}) => {
const userData = JSON.parse(localStorage.getItem('userData'));
const [search,setSearch] =useState('');
const navigate=useNavigate();
const handlemsg = (e) =>{
  e.preventDefault();
  if(setPosts === undefined)navigate("/home");
  if(setPosts === undefined)return;
  if(search === "")setSearch(" ");
  const box=axios.get(`${api.url}:8000/search`, { 
    params: {
        search: search,
        username: userData.username
    }}).then(response => {  
      console.log(response.data);
      setPosts(response.data);
  })
  console.log(search);
}

  return (
    <nav className='m-0'>
        <div className="n-logo">
            <Link to="/home" className='logo' style={{color:"black",textDecoration:"none"}}>
              <h1>Nos<span>talgia</span></h1>
            </Link>
        </div>
      <div className="n-form-button" >
        <form className='n-form' onSubmit={handlemsg} >
          <SearchIcon className='search-icon'/>
          <input type="text" 
          placeholder='Search post'
          id='n-search'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          //onClick={handlemsg}
          />
        </form>
      </div>

      <div className="social-icons">
      <Link to="/home" style={{textDecoration:"none",display:"flex",alignItems:"center",color:"white"}}>
        <AiOutlineHome className='nav-icons'/>
      </Link>
        <Link to="/notification" id='notifi' style={{marginTop:"8px"}}><IoNotificationsOutline className='nav-icons'/></Link>
        <Link to="/chat" style={{textDecoration:"none",display:"flex",alignItems:"center",color:"white"}}>
        <TbMessage className='nav-icons'/>
        </Link>
        <Link to="/friend" style={{textDecoration:"none",display:"flex",alignItems:"center",color:"white"}}>
        <LiaUserFriendsSolid
        className='nav-icons'
        onClick={()=>setShowMenu(true)}/>
        </Link>
      </div>

       <div className="n-profile" >
          {/* <Link to="/profile">  */}
           <Link to={`/profile/${userData.username}`}>
            <img src={`${api.url}:8000/${userData.p_image}`} className='n-img' style={{marginBottom:"-7px"}}/>
          </Link>
      </div>
  
    </nav>
  )
}

export default Nav