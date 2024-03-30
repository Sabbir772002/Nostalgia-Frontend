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
  const [modelDetails, setModelDetails] = useState(
    {
      ModelName: "",
      ModelUserName: "",
      ModelCountryName: "",
      ModelJobName: ""
    }
  );
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/profile/${username}`);
        if (response.status === 200) {
          setUserData(response.data);
          console.log(response.data.p_image);
          //setUserData(data);
          //console.log(userData.p_image);
          setModelDetails({
            ModelName: response.data.first_name,
            ModelUserName: response.data.username,
            ModelCountryName: response.data.thana,
            ModelJobName: "Web Developer in Google",
            image: `http://localhost:8000/${response.data.p_image}`
          });
          
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
  
//   console.log("bro");
//   console.log(userPostData);

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
        modelDetails={modelDetails}
        />
        <CompareBox/>
      </div>
    </div>
  )
}

export default Compare;