import React, { useState, useEffect } from 'react';
import "../LeftSide/Left.css";
import { useLocation } from 'react-router-dom';
import { AiOutlineHome } from "react-icons/ai";
import { FaUsers, FaUserPlus, FaWalking, FaHandHoldingHeart, FaCalendarAlt, FaSuitcaseRolling } from 'react-icons/fa';
import { MdGroup } from 'react-icons/md';
import { GiMedicines } from 'react-icons/gi';
import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Left = ({ profileImg, modelDetails }) => {
  const [btnActive, setBtnActive] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extracting the feature name from the pathname
    const feature = location.pathname.split('/')[1];
    // Setting the active button based on the feature
    setBtnActive(feature || "");
  }, [location]);

  const logoutUser = () => {
    localStorage.removeItem('userData');
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="L-features">
      <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
        <div onClick={() => setBtnActive("home")} id='L-box' className={btnActive === "home" ? "active" : ""}>
          <AiOutlineHome className='margin' />
          <span>Home</span>
        </div>
      </Link>
      <Link to="/friend" style={{ textDecoration: "none", color: "black" }}>
        <div id='L-box' onClick={() => setBtnActive("friend")} className={btnActive === "friend" ? "active" : ""}>
          <FaUsers className='margin' />
          <span>Friends</span>
        </div>
      </Link>
      {/* Other feature links */}
      <Link to="/findfrined" style={{ textDecoration: "none", color: "black" }}>
        <div id='L-box' onClick={() => setBtnActive("findfriend")} className={btnActive === "findfrined" ? "active" : ""}>
          <FaUserPlus className='margin' />
          <span>Find Friend</span>
        </div>
      </Link>
      {/* Other feature links */}
      <Link to="/groups" style={{ textDecoration: "none", color: "black" }}>
        <div id='L-box' onClick={() => setBtnActive("groups")} className={btnActive === "groups" ? "active" : ""}>
          <MdGroup className='margin' />
          <span>Groups</span>
        </div>
      </Link>
      {/* Other feature links */}
      <Link to="/medication" style={{ textDecoration: "none", color: "black" }}>
        <div id='L-box' onClick={() => setBtnActive("medication")} className={btnActive === "medication" ? "active" : ""}>
          <GiMedicines className='margin' />
          <span>Medication</span>
        </div>
      </Link>
      {/* Other feature links */}
      <Link to="/walk" style={{ textDecoration: "none", color: "black" }}>
        <div id='L-box' onClick={() => setBtnActive("walk")} className={btnActive === "walk" ? "active" : ""}>
          <FaWalking className='margin' />
          <span>Walking Buddy</span>
        </div>
      </Link>
      {/* Other feature links */}
      <Link to="/caregiver" style={{ textDecoration: "none", color: "black" }}>
        <div id='L-box' onClick={() => setBtnActive("caregiver")} className={btnActive === "caregiver" ? "active" : ""}>
          <FaHandHoldingHeart className='margin' />
          <span>CareGiver</span>
        </div>
      </Link>
      {/* Other feature links */}
      <Link to="/trip" style={{ textDecoration: "none", color: "black" }}>
        <div id='L-box' onClick={() => setBtnActive("trip")} className={btnActive === "trip" ? "active" : ""}>
          <FaSuitcaseRolling className='margin' />
          <span>Trip</span>
        </div>
      </Link>
      {/* Other feature links */}
      <Link to="/event" style={{ textDecoration: "none", color: "black" }}>
        <div id='L-box' onClick={() => setBtnActive("event")} className={btnActive === "event" ? "active" : ""}>
          <FaCalendarAlt className='margin' />
          <span>Event</span>
        </div>
      </Link>
      {/* Logout */}
      <Link to="/" style={{ textDecoration: "none", color: "black" }} onClick={logoutUser}>
        <div id='L-box' onClick={() => setBtnActive("logout")} className={btnActive === "logout" ? "active" : ""}>
          <BiLogOut className='margin' />
          <span>Log Out</span>
        </div>
      </Link>
    </div>
  );
};

export default Left;
