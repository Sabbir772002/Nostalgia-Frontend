import React, { useState, useEffect, useCallback } from 'react';
import Left from '../../Components/LeftSide/Left';
import ProfileMiddle from '../../Components/Profile/ProfileMiddle';
import Right from '../../Components/RightSide/Right';
import Nav from '../../Components/Navigation/Nav';
import "../Profile/Profile.css";
import ProfileImg from "../../assets/profile.jpg";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ServerUrl from '../../api/serverUrl';

const Profile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState({});
  const user = JSON.parse(localStorage.getItem('userData')) || {};
  const [following, setFollowing] = useState(3);
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [images, setImages] = useState(null);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [profileImg, setProfileImg] = useState(ProfileImg);
  const [userPostData, setUserPostData] = useState([]);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`${ServerUrl.BASE_URL}profile/${username}`, {
        params: {
          username: username,
          user: user.username
        }
      });
      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [username, user.username]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <div className='interface'>
      <Nav
        search={search}
        setSearch={setSearch}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        profileImg={profileImg}
      />
      <div className="home">
        <Left 
          following={following}
          setFollowing={setFollowing}
          profileImg={profileImg}        
        />

        <ProfileMiddle 
          following={following}
          search={search}
          images={images}
          setImages={setImages}
          name={name}
          setName={setName}
          userName={userName}
          setUserName={setUserName}
          profileImg={profileImg}
          setProfileImg={setProfileImg}
          userData={userData}
          setUserData={setUserData}
          userPostData={userPostData}
          setUserPostData={setUserPostData}
          fetchUserData={fetchUserData}
        />
        <Right 
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          following={following}
          setFollowing={setFollowing}
        />
      </div>
    </div>
  );
};

export default Profile;