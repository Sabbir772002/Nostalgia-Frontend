import React, { useState } from 'react'
import "../LeftSide/Left.css"
import {AiOutlineHome} from "react-icons/ai";
import {AiOutlineSearch} from "react-icons/ai";
import {FiTrendingUp} from "react-icons/fi";
import { Link } from 'react-router-dom';
import {BsBookmark} from "react-icons/bs";
import { BsPeople, BsPerson } from 'react-icons/bs';
import { GiMedicines } from 'react-icons/gi';
import {RiFileListLine} from "react-icons/ri";
import {FiSettings} from "react-icons/fi";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Profile from "../../assets/profile.jpg";


const Left = ({profileImg,
               modelDetails
              }) => {

  const [btnActive,setBtnActive] =useState("#")
  const [logOutExit,setLogOutExit] =useState(false)


  return (
    <div className="L-features">
      <Link to="/home" style={{textDecoration:"none",color:"black"}}>
        <div onClick={()=>setBtnActive("#")} id='L-box' className={btnActive === "#" ? "active" : ""} >
          <AiOutlineHome className='margin'/>
          <span>Home</span>
        </div>
      </Link>

      <Link to="/friend" style={{textDecoration:"none",color:"black"}}>
      <div id='L-box' onClick={()=>setBtnActive("#explore")} className={btnActive === "#explore" ? "active" : ""}>
        <AiOutlineSearch className='margin'/>
         <span>Explore</span>
      </div>
      </Link>

      <Link to="/friend" style={{textDecoration:"none",color:"black"}}>
      <div id='L-box'  onClick={()=>setBtnActive("#trending")} className={btnActive === "#trending" ? "active" : ""}>
          <FiTrendingUp className='margin'/>
        <span>Trending</span>
      </div>
      </Link>
      <Link to="/friend" style={{textDecoration:"none",color:"black"}}>
      <div id='L-box' onClick={() => setBtnActive("#Friends")} className={btnActive === "#Friends" ? "active" : ""}>
        <BsPeople className='margin'/>
        <span>Friends</span>
      </div>
      </Link>

      
      <Link to="/findfrined" style={{textDecoration:"none",color:"black"}}>
      <div id='L-box' onClick={() => setBtnActive("#FFriends")} className={btnActive === "#FFriends" ? "active" : ""}>
        <BsPerson className='margin'/>
        <span>Find Friend</span>
      </div>
     </Link>

     <Link to="/forget" style={{textDecoration:"none",color:"black"}}>
      <div id='L-box' onClick={() => setBtnActive("#Groups")} className={btnActive === "#Groups" ? "active" : ""}>
        <BsPeople className='margin'/>
        <span>Groups</span>
      </div>
      </Link>

      <Link to="/medication" style={{textDecoration:"none",color:"black"}}>
      <div id='L-box' onClick={() => setBtnActive("#Medication")} className={btnActive === "#Medication" ? "active" : ""}>
        <GiMedicines className='margin'/>
        <span>Medication</span>
      </div> 
      </Link>

      <div id='L-box' onClick={() => setBtnActive("#walk")} className={btnActive === "#walk" ? "active" : ""}>
        <BsPeople className='margin'/>
        <span>Walking Buddy</span>
      </div> 

      <div id='L-box' onClick={() => setBtnActive("#Trip")} className={btnActive === "#Trip" ? "active" : ""}>
        <BsPeople className='margin'/>
        <span>Trip</span>
      </div>
      <div id='L-box' onClick={()=>setBtnActive("#settings")} className={btnActive === "#settings" ? "active" : ""}>
        <FiSettings 
        className='margin'/>
        <span>Settings</span>
      </div>


    </div>
  )
}

export default Left