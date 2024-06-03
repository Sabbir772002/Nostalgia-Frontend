import { useState,useEffect } from 'react'
import Left from '../../Components/LeftSide/Left'
import ProfileMiddle from '../../Components/Profile/ProfileMiddle'
import Right from '../../Components/RightSide/Right'
import Nav from '../../Components/Navigation/Nav'
import EditPro from '../../Components/EditPro/EditPro'
import Overseer from '../../Components/EditPro/Overseer/Overseer'
import "./Compare.css"
import CompareBox from "./CompareBox"
import { useUser } from '../../context/UserContext';
import moment from 'moment'
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import SearchIcon from '@mui/icons-material/Search';
import api from '../../util/api';
const Compare = () => {
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
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${api.url}:8000/profile/${username}`,
        {
          params : {
            username: username,
            user: username
          },
        });
        if (response.status === 200) {
          setUserData(response.data);
              // Additional setup based on fetched userData
            } else {
              console.error('Failed to fetch user data');
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
    };

    fetchUserData();
  }, [username]);
   
  console.log(userData);
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
        <CompareBox
        userData={userData}
        />
      </div>
    </div>
  )
}

export default Compare;