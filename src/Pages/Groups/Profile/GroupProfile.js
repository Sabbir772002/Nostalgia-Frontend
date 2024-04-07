import { useState,useEffect } from 'react'
import Left from '../../../Components/LeftSide/Left'
import Gprofile from '../../../Components/GroupProfile/Gprofile'
import Right from '../../../Components/RightSide/Right'
import Nav from '../../../Components/Navigation/Nav'
import "../Profile/Profile.css"
import moment from 'moment'
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios
const GroupProfile = () => {
  const { username } = useParams();
  console.log(username);
  const [userData, setUserData] = useState([]);
  const user= JSON.parse(localStorage.getItem('userData'));
  const [following, setFollowing] = useState(3);
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [images, setImages] = useState(null);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [data,setData] = useState("");
  const [userPostData, setUserPostData] = useState([]);
  const [group, setgroup] = useState("");

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/g_profile/${username}`);
        if (response.status === 200) {
          setUserData(response.data);
          console.log("i am in group profile");
          console.log(response.data);
          setgroup(response.data);
          console.log(group);
          } else {
              console.error('Failed to fetch user data');
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
    };

    
  fetchUserData();

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
        group={group}
        
        />

        <Gprofile 
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
        group={group}
        setgroup={setgroup}
        userPostData={userPostData}
        setUserPostData={setUserPostData}
        />
        
        <Right 
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        following={following}
        setFollowing={setFollowing}
        />
      </div>
    </div>
  )
}
export default GroupProfile;