import { useState,useEffect } from 'react'
import Left from '../../../Components/LeftSide/Left'
import Gprofile from '../../../Components/GroupProfile/Gprofile'
import Right from '../../../Components/GroupRight/Right'
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
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    gprofile();
  } 
  , [username]);
  
    const gprofile = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/g_profile/${username}`,
        {
          params: {
            user_id: user.id
          }
        });
        if (response.status === 200) {
          console.log("i am in group profile");

          console.log(response.data);
          setgroup(response.data);
          } else {
              console.error('Failed to fetch user data');
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
    };

    const fetchPosts = () => {
      axios.get(`http://localhost:8000/gp_post`,
      {
        params: {
          username:username
        }
      })
      .then(response => {
        console.log(response.data);
          setPosts(response.data);
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
        });
    };
    useEffect(() => {
      fetchPosts();
    }, []);

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
        group={group}
        setgroup={setgroup}
        gprofile={gprofile}
        fetchPosts={fetchPosts}
        posts={posts}
        setPosts={setPosts} 
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