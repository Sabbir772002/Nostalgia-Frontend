import React from 'react'
import FeedUser from './FeedUser'
import { useState,useEffect } from 'react';
import { useLocation,useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const UserHome = ({setUserPostData,userPostData,profileImg,userD,images}) => {
  const location = useLocation();
  //const userData = JSON.parse(new URLSearchParams(location.search).get('userData'));
  const userData= JSON.parse(localStorage.getItem('userData'));
  const { username } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  useEffect(() => {
    // Fetch posts when component mounts
    fetchPosts();
  }, []);

  // React.useEffect(() => {
  //   if (userData && username !== userData.username) {
  //     setShowModal(true);
  //   }
  // }, [username, userData]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //  if (userData && username !== userData.username) {
  //   navigate(userData?`/profile/edit/${userData.username}`:'/login');
  //  }

  const fetchPosts = () => {
    axios.get(`http://localhost:8000/singleblog`,
    {
      params: {
        username: userData.username
      }
    })
    .then(response => {
      // console.log(userData);
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  };
 
  return (
   

    <div>

        {posts && posts.length ?<FeedUser 
                               userD ={userData}
                               profileImg={userData.p_image}
                               posts={posts}
                               setPosts={setPosts}
                               images={images}
                               /> 
        :
        (<p style={{textAlign:"center",marginBottom:"40px"}}>
            NO POSTS ARE HERE
        </p>)
        }
    </div>
    
  )
}

export default UserHome 

