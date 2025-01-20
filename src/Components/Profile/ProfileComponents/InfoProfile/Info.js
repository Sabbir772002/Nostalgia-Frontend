import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import Info3 from '../../../../assets/Info-Dp/img-3.jpg';
import { IoCameraOutline } from 'react-icons/io5';
import { BiMessage, BiLogOut } from 'react-icons/bi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FaCheckCircle } from 'react-icons/fa';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useNavigate } from 'react-router-dom';
import './Info.css';
import axios from 'axios';
import { height } from '@mui/system';
import { FaUserEdit } from 'react-icons/fa';
import api from '../../../../util/api';
import Logout from '../InfoProfile/outlog';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { useEffect } from 'react';
import PhoneIcon from '@mui/icons-material/Phone'; // Import phone icon
import PersonIcon from '@mui/icons-material/Person'; // Import gender icon

const Info = ({
  userPostData,
  following,
  userData,
  setUserData,
  profileImg,
  setProfileImg,
  userName,
  setUserName,
  fetchUserData,
}) => {
  const [coverImg, setCoverImg] = useState(Info3);
  const importProfile = useRef();
  const importCover = useRef();

  const handleFile1 = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      const imgObj = { image: URL.createObjectURL(img) };
      const profileImg = imgObj.image;
      setProfileImg(profileImg);
    }
  };
  const handleFile2 = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      const imgObj = { image: URL.createObjectURL(img) };
      const coverImg = imgObj.image;
      setCoverImg(coverImg);
    }
  };
  const user = JSON.parse(localStorage.getItem('userData'));
const navigate = useNavigate();
  const logoutUser = () => {
    // Remove 'userData' from localStorage or perform logout actions
    localStorage.removeItem('userData');
    console.log("logout "+user.username);
    localStorage.clear();
    navigate('/')
    // Add other logout logic here
  };
  const add_fnf = async () => {
    try {
      console.log("add_fnf");
        const response = await axios.post(`${api.url}:8000/add_fnf `, {
            user_id: user.id,
            friend_id: userData.id,
            type: "Sent"
        });
        alert("Friend Request Sent successfully");
         fetchUserData();
        // You may update UI state or perform other actions after successful request
    } catch (error) {
      console.log(error);
      // if(error.response.data){
      //   alert(error.response.data.message);
      // }
        console.error('Error:', error);
        // Handle errors if any
    }
};
const delete_fnd = async () => {
  try {
      
      const response = await axios.post(`${api.url}:8000/delete_fnd`, {
          user_id: user.id,
          friend_id: userData.id,
          type: "Sent"
      });
      alert("Friend Request Delete successfully")
      fetchUserData();
      console.log(response.data.message); // Log the response message
      // You may update UI state or perform other actions after successful request
  } catch (error) {
      alert(error.response.data.message)
      console.error('Error:', error);
      // Handle errors if any
  }
};
const [addinfo, setAddinfo] = useState([]);
const fetchaddinfo = async () => {
  try {
    const response = await axios.get(`${api.url}:8000/addinfo`, {
      params: {
        user_id: userData.id,
      }
    }
    );
      setAddinfo(response.data);
      console.log(response.data);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}
useEffect(() => {
  console.log(userData);
  fetchaddinfo();
}, [userData]);

return (
    <div className='info'>
      <div className='info-cover'>
        <img src={coverImg} alt='' />
        <img src={`${api.url}:8000/${userData.pp}`} alt='profile' />
        {/* <div className='coverDiv'>
          <IoCameraOutline className='coverSvg' onClick={() => importCover.current.click()} />
        </div> */}
          {userData && userData.verify===1 ?(
                    <div className='profileDiv bg-light' style={{width:24,height:24}}>
                    <FaCheckCircle className='text-primary' style={{ width: 25, height: 25 }} />
                    </div>
              ) :(
                <></>
              )
            }
      </div>
      <input type='file' ref={importProfile} onChange={handleFile1} style={{ display: 'none' }} />
      <input type='file' ref={importCover} onChange={handleFile2} style={{ display: 'none' }} />
      <div className='info-follow'>
        <h1>{userData.first_name}</h1>
        <p>{userData.last_name}</p>

         {userData.username === user.username ? (
            <Logout logoutUser={logoutUser} />
          ) : (
            userData && userData.if_fnf === 1 ? (
              <Link to='' className='logout'>
                <BiMessage />
                Message
              </Link>
            ) : (
              userData && userData.img_privacy === 0 ? (
                <Link to={`/compare/${userData.username}`} className="logout">
                     <FontAwesomeIcon icon={faUserFriends} />
                    Compare Image
                </Link>
              ) : null
            )
          )
        }

        { userData.username === user.username ? (
            <Link to={`/profile/edit/${user.username}`}>
              <button>
                <FaUserEdit />
                Edit Profile
              </button>
            </Link>
          ) : (
            (userData.type != null && userData.type == "Sent" && userData.good==1) ? (
              <Link to='' onClick={delete_fnd}>
                <button>
                  <FontAwesomeIcon icon={faUserFriends} />
                  {userData.type}
                </button>
              </Link>
            ) : (userData.is_fnf==1) ? (
              <Link to=''>
                <button>
                  <FontAwesomeIcon icon={faUserFriends} />
                  {userData.type}
                </button>
              </Link>
            ) : (
              <Link to='' >
                    <button onClick={add_fnf}>
                  <FontAwesomeIcon icon={faUserFriends} />
                  Request Now
                  </button>

              </Link>
            )
          )
}
      <div className="row">
        <div className="col-md-6">
          <div className="info-details-list">
            <LocationOnOutlinedIcon />
            <span>{userData.thana}</span>
          </div>
          <div className="info-details-list">
            <MailOutlineIcon />
            <span>{userData.email}</span>
          </div>
          <div className="info-details-list">
            <PersonIcon />
            <span>{userData.gender}</span>
          </div>
        </div>
        <div className="col-md-6 text-right">
        {addinfo && addinfo.length > 0 ? (
            <>
              {addinfo.map((add, index) => (
                <div className="info-details-list" key={index}>
                  {add.type == 1 && <SchoolOutlinedIcon />}
                  {add.type == 0 && <WorkOutlineRoundedIcon />}
                  {add.type == 1 && "Studied at"}
                  {add.type == 0 && "Works at"}
                  <span>{add.content}</span>
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
    </div>
      </div>
    </div>
  );
};

export default Info;