import { useState,useEffect } from 'react'
import Left from '../../Components/LeftSide/Left'
import ProfileMiddle from '../../Components/Profile/ProfileMiddle'
import Right from '../../Components/RightSide/Right'
import Nav from '../../Components/Navigation/Nav'
import EditPro from '../../Components/EditPro/EditPro'
import Overseer from '../../Components/EditPro/Overseer/Overseer'
import "../Profile/Profile.css"
import ProfileImg from "../../assets/profile.jpg"
import { useUser } from '../../context/UserContext';
import img1 from "../../assets/User-post/img1.jpg"
import img2 from "../../assets/User-post/img2.jpg"
import img3 from "../../assets/User-post/img3.jpg"
import moment from 'moment'
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import SearchIcon from '@mui/icons-material/Search';
import api from '../../util/api';

const EditProfile = () => {
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
  const [profileImg, setProfileImg] = useState(ProfileImg);
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
        const response = await axios.get(`${api.url}:8000/profile/${username}`);
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
            image: `${api.url}:8000/${response.data.p_image}`
          });
          const initialUserPostData = [
            {
              id: 1,
              username: "Vijay",
              profilepicture: ProfileImg,
              img: `${api.url}:8000/${response.data.p_image}`,
              datetime: moment("20230401", "YYYYMMDD").fromNow(),
              body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia illum provident consequuntur reprehenderit tenetur, molestiae quae blanditiis rem placeat! Eligendi, qui quia quibusdam dolore molestiae veniam neque fuga explicabo illum?",
              like: 22,
              comment: 12
            },
         {
        id:2,
        username:"Vijay",
        profilepicture:ProfileImg,
        img:`${api.url}:8000/${response.data.p_image}`,
        datetime:moment("20230525", "YYYYMMDD").fromNow(),
        body:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia illum provident consequuntur reprehenderit tenetur, molestiae quae blanditiis rem placeat! Eligendi, qui quia quibusdam dolore molestiae veniam neque fuga explicabo illum?",
        like: 84,
        comment:30
        },
        {
            id:3,
            username:"Vijay",
            profilepicture:ProfileImg,
            img:`${api.url}:8000/${response.data.p_image}`,
            datetime:moment.utc("2023-08-13 12:45:00").local().startOf('seconds').fromNow(),
            body:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia illum provident consequuntur reprehenderit tenetur, molestiae quae blanditiis rem placeat! Eligendi, qui quia quibusdam dolore molestiae veniam neque fuga explicabo illum?",
            like: 340,
            comment:76
        }
      ];
              setUserPostData(initialUserPostData);
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

  
  console.log("bro");
  console.log(userPostData);

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
        <EditPro/> 
       <Overseer/>
      </div>
    </div>
  )
}
export default EditProfile