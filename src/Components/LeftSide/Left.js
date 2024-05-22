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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FaWalking } from 'react-icons/fa';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaSuitcaseRolling } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';



const Left = ({profileImg,
               modelDetails
              }) => {

  const [btnActive,setBtnActive] =useState("#")
  const [logOutExit,setLogOutExit] =useState(false)


  return (
    <div className="L-features">
      <Link to="/home" style={{textDecoration:"none",color:"black"}}>
        <div onClick={()=>setBtnActive("#")} id='L-box' className={btnActive === "#" ? "active" : ""} >
          <FaHome className='margin'/>
          <span>Home</span>
        </div>
      </Link>
      <Link to="/friend" style={{textDecoration:"none",color:"black"}}>
      <div id='L-box' onClick={() => setBtnActive("#Friends")} className={btnActive === "#Friends" ? "active" : ""}>
        <FaUsers className='margin'/>
        <span>Friends</span>
      </div>
      </Link>

      
      <Link to="/findfrined" style={{textDecoration:"none",color:"black"}}>
      <div id='L-box' onClick={() => setBtnActive("#FFriends")} className={btnActive === "#FFriends" ? "active" : ""}>
        <FaUserPlus className='margin'/>
        <span>Find Friend</span>
      </div>
     </Link>

     <Link to="/groups" style={{textDecoration:"none",color:"black"}}>
      <div id='L-box' onClick={() => setBtnActive("#Groups")} className={btnActive === "#Groups" ? "active" : ""}>
      <FaUsers className='margin' />
        <span>Groups</span>
      </div>
      </Link>

      <Link to="/medication" style={{textDecoration:"none",color:"black"}}>
      <div id='L-box' onClick={() => setBtnActive("#Medication")} className={btnActive === "#Medication" ? "active" : ""}>
        <GiMedicines className='margin'/>
        <span>Medication</span>
      </div> 
      </Link>

      <Link to="/walk" style={{textDecoration:"none",color:"black"}}>

      <div id='L-box' onClick={() => setBtnActive("#walk")} className={btnActive === "#walk" ? "active" : ""}>
      <FaWalking className='margin' />
        <span>Walking Buddy</span>
      </div> 
      </Link>
      <Link to="/caregiver" style={{textDecoration:"none",color:"black"}}>
      <div id='L-box' onClick={() => setBtnActive("#CareGiver")} className={btnActive === "#CareGiver" ? "active" : ""}>
       <FaHandHoldingHeart className='margin'/>
        <span>CareGiver</span>
      </div>
      </Link>  
      <Link to="/trip" style={{textDecoration:"none",color:"black"}}>
      <div id='L-box' onClick={()=>setBtnActive("#Trip")} className={btnActive === "#Trip" ? "active" : ""}>
        <FaSuitcaseRolling  className='margin' />
         <span>Trip</span>
      </div>
      </Link>

      <Link to="/event" style={{textDecoration:"none",color:"black"}}>
      <div id='L-box'  onClick={()=>setBtnActive("#Event")} className={btnActive === "#Event" ? "active" : ""}>
          <FaCalendarAlt  className='margin'/>
        <span>Event</span>
      </div>
      </Link>

      <Link to="" style={{textDecoration:"none",color:"black"}}>

      <div id='L-box' onClick={()=>setBtnActive("#settings")} className={btnActive === "#settings" ? "active" : ""}>
        <FiSettings 
        className='margin'/>
        <span>Settings</span>
      </div>
      </Link>


    </div>
  )
}

export default Left;

