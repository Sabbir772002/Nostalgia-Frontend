import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import Info3 from '../../../../assets/Info-Dp/img-3.jpg';
import { BiMessage } from 'react-icons/bi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FaCheckCircle, FaUserEdit } from 'react-icons/fa';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useNavigate } from 'react-router-dom';
import './Info.css';
import axios from 'axios';
import ServerUrl, { getImageUrl } from '../../../../api/serverUrl';
import Logout from '../InfoProfile/outlog';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PersonIcon from '@mui/icons-material/Person';
import ProfileDefaultImg from '../../../../assets/profile.jpg';

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
      setProfileImg(imgObj.image);
    }
  };
  const handleFile2 = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      const imgObj = { image: URL.createObjectURL(img) };
      setCoverImg(imgObj.image);
    }
  };

  const rawUser = JSON.parse(localStorage.getItem('userData')) || {};
  const activeUsername = rawUser.username ? (rawUser.username.includes('@') ? rawUser.username.split('@')[1] : rawUser.username) : '';
  const user = { ...rawUser, username: activeUsername };

  const navigate = useNavigate();
  const logoutUser = () => {
    localStorage.removeItem('userData');
    navigate('/');
  };

  const add_fnf = async () => {
    try {
      await axios.post(`${ServerUrl.BASE_URL}add_fnf`, {
        user_id: user.id,
        friend_id: userData.id,
        type: "Sent"
      });
      alert("Friend Request Sent successfully");
      if (fetchUserData) fetchUserData();
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  const delete_fnd = async () => {
    try {
      const response = await axios.post(`${ServerUrl.BASE_URL}delete_fnd`, {
        user_id: user.id,
        friend_id: userData.id,
        type: "Sent"
      });
      alert("Friend Request Deleted successfully");
      if (fetchUserData) fetchUserData();
      console.log(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || 'Error deleting request');
      console.error('Error deleting friend:', error);
    }
  };

  const [addinfo, setAddinfo] = useState([]);

  const fetchaddinfo = useCallback(async () => {
    if (!userData || !userData.id) return;
    try {
      const response = await axios.get(`${ServerUrl.BASE_URL}addinfo`, {
        params: {
          user_id: userData.id,
        }
      });
      setAddinfo(response.data || []);
    } catch (error) {
      console.error('Error fetching addinfo:', error);
    }
  }, [userData]);

  useEffect(() => {
    fetchaddinfo();
  }, [fetchaddinfo]);

  const avatarSrc = getImageUrl(userData.pp || userData.p_image);

  return (
    <div className='info'>
      <div className='info-cover'>
        <img src={coverImg} alt='Cover' className='cover-img-photo' />
        <div className='avatar-container'>
          <img
            src={avatarSrc}
            alt='profile'
            className='profile-avatar-img'
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = ProfileDefaultImg;
            }}
          />
          {userData && userData.verify === 1 && (
            <span style={{ position: 'absolute', bottom: '4px', right: '4px', backgroundColor: '#fff', borderRadius: '50%', padding: '2px', display: 'flex', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
              <FaCheckCircle style={{ width: 22, height: 22, color: '#1877f2' }} />
            </span>
          )}
        </div>
      </div>
      <input type='file' ref={importProfile} onChange={handleFile1} style={{ display: 'none' }} />
      <input type='file' ref={importCover} onChange={handleFile2} style={{ display: 'none' }} />

      <div className='info-follow'>
        <h1 style={{ marginTop: '55px', fontWeight: 700, fontSize: '1.6rem', color: '#111' }}>
          {userData.first_name || userData.username} {userData.last_name || ''}
        </h1>
        <p style={{ color: '#65676b', fontSize: '0.95rem' }}>@{userData.username || 'user'}</p>

        {/* Action Buttons Row */}
        <div className="action-buttons-row" style={{ display: 'flex', gap: '12px', justifyContent: 'center', margin: '16px 0' }}>
          {userData.username === user.username ? (
            <>
              <Link to={`/profile/edit/${user.username}`} style={{ textDecoration: 'none' }}>
                <button className="btn-profile-action">
                  <FaUserEdit />
                  Edit Profile
                </button>
              </Link>
              <Logout logoutUser={logoutUser} />
            </>
          ) : (
            <>
              {userData.is_fnf === 1 ? (
                <Link to='' className='btn-profile-action' style={{ textDecoration: 'none' }}>
                  <BiMessage />
                  Message
                </Link>
              ) : (
                <button className="btn-profile-action" onClick={add_fnf}>
                  <FontAwesomeIcon icon={faUserFriends} />
                  {userData.type === "Sent" ? "Request Sent" : "Request Now"}
                </button>
              )}
            </>
          )}
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            {userData.thana && (
              <div className="info-details-list">
                <LocationOnOutlinedIcon style={{ color: '#1877f2' }} />
                <span>{userData.thana}</span>
              </div>
            )}
            {userData.email && (
              <div className="info-details-list">
                <MailOutlineIcon style={{ color: '#1877f2' }} />
                <span>{userData.email}</span>
              </div>
            )}
            {userData.gender && (
              <div className="info-details-list">
                <PersonIcon style={{ color: '#1877f2' }} />
                <span>{userData.gender}</span>
              </div>
            )}
          </div>
          <div className="col-md-6">
            {addinfo && addinfo.length > 0 && (
              <>
                {addinfo.map((add, index) => (
                  <div className="info-details-list" key={index}>
                    {add.type === 1 ? <SchoolOutlinedIcon style={{ color: '#1877f2' }} /> : <WorkOutlineRoundedIcon style={{ color: '#1877f2' }} />}
                    <span>{add.type === 1 ? "Studied at " : "Works at "}{add.content}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;