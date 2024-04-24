import {  useState,useEffect } from 'react'
import "../Home/Home.css"
import axios from 'axios';
import Left from "../../Components/LeftSide/Left"
import Middle from "../../Components/MiddleSide/Middle"
import Right from '../../Components/RightSide/Right'
import Nav from '../../Components/Navigation/Nav'
import moment from 'moment/moment'

import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  //const userData = JSON.parse(new URLSearchParams(location.search).get('userData'));
  const userData= JSON.parse(localStorage.getItem('userData'));

  const [posts, setPosts] = useState([]);
  const fetchPosts = () => {
    axios.get('http://localhost:8000/htimeline', {
    params: {
        username: userData.username
    }
})
.then(response => {
    setPosts(response.data);
})
.catch(error => {
    console.error('Error fetching posts:', error);
});

  };
  useEffect(() => {
    // Fetch posts when component mounts
    fetchPosts();
  }, []);


      const [body,setBody] =useState("")
      const [importFile,setImportFile] =useState("")
   
   const [search,setSearch] =useState("")

    
  const [following,setFollowing] =useState("")
        
  const [showMenu,setShowMenu] =useState(false)
  const [images,setImages] =  useState(null)

  return (
    <div className='interface'>
        <Nav 
        search={search}
        setSearch={setSearch}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        />

    <div className="home">
   
        <Left />

        <Middle posts={posts}
        fetchPosts={fetchPosts}

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
export default Home