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
import './Info.css';
const Info = ({
  userPostData,
  following,
  userD,
  setUserD,
  profileImg,
  setProfileImg,
  name,
  setName,
  userName,
  setUserName
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

  const logoutUser = () => {
    // Remove 'userData' from localStorage or perform logout actions
    localStorage.removeItem('userData');
    // Add other logout logic here
  };

  return (
    <div className='info'>
      <div className='info-cover'>
        <img src={coverImg} alt='' />
        <img src={userD.image} alt='profile' />
        <div className='coverDiv'>
          <IoCameraOutline className='coverSvg' onClick={() => importCover.current.click()} />
        </div>
        <div className='profileDiv'>
          <IoCameraOutline className='profileSvg' onClick={() => importProfile.current.click()} />
        </div>
      </div>

      <input type='file' ref={importProfile} onChange={handleFile1} style={{ display: 'none' }} />
      <input type='file' ref={importCover} onChange={handleFile2} style={{ display: 'none' }} />

      <div className='info-follow'>
        <h1>{userD.name}</h1>
        <p>{userD.username}</p>

        {userD.username === user.username ? (
          <Link to='/' className='logout' onClick={logoutUser}>
            <BiLogOut />
            Logout
          </Link>
        ) : (
          <Link to='' className='logout'>
            <BiMessage />
            Message
          </Link>
        )}

        {userD.username === user.username ? (
          <Link to={`/profile/edit/${user.username}`}>
            <button>
              <BiLogOut />
              Edit Profile
            </button>
          </Link>
        ) : (
          <Link to=''>
            <button>
            <FontAwesomeIcon icon={faUserFriends} />
              Friend
            </button>
          </Link>
        )}

        <div className='info-details'>
          <div className='info-col-1'>
            <div className='info-details-list'>
              <LocationOnOutlinedIcon />
              <span>{userD.email}</span>
            </div>

            <div className='info-details-list'>
              <WorkOutlineRoundedIcon />
              <span>{userD.name}</span>
            </div>

            <div className='info-details-list'>
              <CalendarMonthRoundedIcon />
              <span>Joined in 2023-08-12</span>
            </div>
          </div>

          <div className='info-col-2'>
            <div>
              <h2>5,000</h2>
              <span>Followers</span>
            </div>
            <div>
              <h2>{userPostData.length}</h2>
              <span>Posts</span>
            </div>
            <div>
              <h2>{following}</h2>
              <span>Following</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
