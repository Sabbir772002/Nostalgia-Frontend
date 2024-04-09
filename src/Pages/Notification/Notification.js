import React from 'react'
import "../Notification/Notification.css"
import img1 from "../../assets/Following/img-1.jpg"
import img2 from "../../assets/Following/img-2.jpg"
import img3 from "../../assets/Following/img-3.jpg"
import img4 from "../../assets/Following/img-5.jpg"
import {AiOutlineHome} from "react-icons/ai"
import ProfileImg from "../../assets/profile.jpg"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect,useState} from 'react'

const Notification = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userData'));
  const [notification, setNotification] = useState([]);
  // if(user.username == ""){ 
  //   navigate( "/");
  //    return;
  // }
  
  
  const fetchData = () => {
    axios.get('http://localhost:8000/notification', {
      params: {
        username: user.username
      }
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${user.token}`
      // }
    })
    .then(response => {
      console.log(response.data);
      setNotification(response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  useEffect(() => { 
    fetchData();
  }, []);
  function timeAgo(timestamp) {
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + " years ago";
    }
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " months ago";
    }
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " days ago";
    }
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hours ago";
    }
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " minutes ago";
    }
    
    return Math.floor(seconds) + " seconds ago";
  }  


  
  return (
    <div className="noti-overall">
      <div className='nav-section'>
        <Link to="/home" style={{textDecoration:"none"}} className='noti-div'><AiOutlineHome className='noti-Home-Icon'/></Link>
        <Link to={`/profile/${user.username}`} style={{textDecoration:"none"}}><img src={ProfileImg} alt="" /></Link>
      </div>

    <div className="notification-group">
      <h1>Notification</h1>
      <div className="notification-section">
      {  notification.map((noti, index) => (
        <div key={index} className="notification-msg">
          <img src={`http://localhost:8000/${noti.img}`} alt="" /> 
          <p>
            {/* {noti.noti_sender} {noti.action} <span className='noti-like'>your profile picture</span> */}
            {noti.sender} <span className='noti-like'>{noti.msg}</span>
            <br />
            {/* <Link to={noti.link} className='noti-link'>View</Link> */}
            <h1>{noti.noti_time}</h1>
            <small>{timeAgo(noti.time)}</small> {/* Assuming noti.timestamp contains the time */}
          </p>
        </div>
      ))}

        

      
      </div>
    </div>
    </div>
  )
}

export default Notification