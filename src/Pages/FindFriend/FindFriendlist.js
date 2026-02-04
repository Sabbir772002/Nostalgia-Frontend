import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Profile from "../../assets/profile.jpg"
import img1 from "../../assets/Post Images/img1.jpg"
import img2 from "../../assets/Post Images/img2.jpg"
import img3 from "../../assets/Post Images/img3.jpg"
import img4 from "../../assets/Post Images/img4.jpg"
import img5 from "../../assets/Post Images/img5.jpg"
import img6 from "../../assets/Post Images/img6.jpg"


import DPimg1 from "../../assets/DP/img1.jpg"
import DPimg2 from "../../assets/DP/img2.jpg"
import DPimg3 from "../../assets/DP/img3.jpg"
import DPimg4 from "../../assets/DP/img4.jpg"
import DPimg5 from "../../assets/DP/img5.jpg"
import DPimg6 from "../../assets/DP/img6.jpg"

import cover from "../../assets/Info-Dp/img-3.jpg"

import Cover1 from "../../assets/Friends-Cover/cover-1.jpg"
import Cover2 from "../../assets/Friends-Cover/cover-2.jpg"
import Cover3 from "../../assets/Friends-Cover/cover-3.jpg"
import Cover5 from "../../assets/Friends-Cover/cover-5.jpg"
import Cover7 from "../../assets/Friends-Cover/cover-7.jpg"
import Cover8 from "../../assets/Friends-Cover/cover-8.jpg"
import Cover9 from "../../assets/Friends-Cover/cover-9.jpg"

import Uimg1 from "../../assets/User-post/img1.jpg"
import Uimg2 from "../../assets/User-post/img2.jpg"
import Uimg3 from "../../assets/User-post/img3.jpg"

import "../Friend/Friend.css"
import FindFlist from "./FindFlist"
import Left from "../../Components/LeftSide/Left"
import Middle from "../../Components/MiddleSide/Middle"
import Right from '../../Components/RightSide/Right'
import Nav from '../../Components/Navigation/Nav'
import moment from 'moment/moment'
import { useLocation } from 'react-router-dom';
import api from '../../util/api';
const FindFriendlist = () => {
  const location = useLocation();
  //const userData = JSON.parse(new URLSearchParams(location.search).get('userData'));
  const userData= JSON.parse(localStorage.getItem('userData'));

 // console.log(userData);
  
      const [body,setBody] =useState("");
      const [importFile,setImportFile] =useState("");
      

     const [fndlist, setfndlist] = useState([]);

     // Define the function to fetch data
// Define the function to fetch data
// Define the function to fetch data
const fetchData = () => {
  axios.get(`${api.url}:8000/findfriend`, {
      params: {
          user_id: userData.username
      }
  })
  .then(response => {
      // console.log("mere fnd");
      // console.log(response.data.users);
      setfndlist(response.data.users);
      // console.log(fndlist);
  })
  .catch(error => {
      console.error('Error fetching data:', error);
  });
};

// Call the fetchData function using useEffect
useEffect(() => {
  fetchData(); // Call the fetchData function
}, []);

   const [search,setSearch] =useState("");
  const [following,setFollowing] =useState("");
        
  const [showMenu,setShowMenu] =useState(false);
  const [images,setImages] =  useState(null);

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
      {userData.username.includes("@") ? (
        <h1 className="error mt-4">You are not allowed to view this page</h1>
      ) : (
        <>
        <FindFlist
        fndlist={fndlist}
        setfndlist={setfndlist}
        fetchData={fetchData}
        />   
        {/* <Right
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        following={following}
        setFollowing={setFollowing}
        /> */}
         </>
      )}
    </div>

    </div>
  )
}

export default  FindFriendlist;
