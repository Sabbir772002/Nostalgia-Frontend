import { useState,useEffect } from 'react'
import Left from '../../Components/LeftSide/Left'
import ProfileMiddle from '../../Components/Profile/ProfileMiddle'
import Right from '../../Components/RightSide/Right'
import Nav from '../../Components/Navigation/Nav'
import "../Profile/Profile.css"
import ProfileImg from "../../assets/profile.jpg"
import { useUser } from '../../context/UserContext';
import img1 from "../../assets/User-post/img1.jpg"
import img2 from "../../assets/User-post/img2.jpg"
import img3 from "../../assets/User-post/img3.jpg"
import moment from 'moment'
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const Profile = () => {
  const { username } = useParams();
  console.log(username);
  const [userData, setUserData] = useState(null);
  const user= JSON.parse(localStorage.getItem('userData'));
  const [following, setFollowing] = useState(3);
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [images, setImages] = useState(null);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [profileImg, setProfileImg] = useState(ProfileImg);
  //const [userPostData, setUserPostData] = useState([]);
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
        const response = await axios.get(`http://127.0.0.1:8000/api/profile/${username}`);
        if (response.status === 200) {
          const data = response.data;
          //console.log(data);
          setUserData(data);
          setModelDetails({
            ModelName: data.first_name,
            ModelUserName: data.username,
            ModelCountryName: data.thana,
            ModelJobName: "Web Developer in Google"
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

  // const [modelDetails,setModelDetails] = useState(
  //   {
  //     ModelName:user.first_name,
  //     ModelUserName:user.username,
  //     ModelCountryName:user.thana,
  //     ModelJobName:"Web Developer in Google"
  //   }
  // )
  const [userPostData ,setUserPostData] =useState(
    [
      {
        id:1,
        username:"Vijay",
        profilepicture:Profile,
        img:img1,
        datetime:moment("20230401", "YYYYMMDD").fromNow(),
        body:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia illum provident consequuntur reprehenderit tenetur, molestiae quae blanditiis rem placeat! Eligendi, qui quia quibusdam dolore molestiae veniam neque fuga explicabo illum?",
        like: 22,
        comment:12
    },
    {
        id:2,
        username:"Vijay",
        profilepicture:Profile,
        img:img2,
        datetime:moment("20230525", "YYYYMMDD").fromNow(),
        body:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia illum provident consequuntur reprehenderit tenetur, molestiae quae blanditiis rem placeat! Eligendi, qui quia quibusdam dolore molestiae veniam neque fuga explicabo illum?",
        like: 84,
        comment:30
    },
    {
        id:3,
        username:"Vijay",
        profilepicture:Profile,
        img:img3,
        datetime:moment.utc("2023-08-13 12:45:00").local().startOf('seconds').fromNow(),
        body:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia illum provident consequuntur reprehenderit tenetur, molestiae quae blanditiis rem placeat! Eligendi, qui quia quibusdam dolore molestiae veniam neque fuga explicabo illum?",
        like: 340,
        comment:76
    }
    ]
  )

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
        modelDetails={modelDetails}
        setModelDetails={setModelDetails}
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

export default Profile