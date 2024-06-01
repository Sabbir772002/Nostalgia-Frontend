import React from 'react'
import FeedUser from './FeedUser'
import { useState,useEffect } from 'react';
import { useLocation,useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const UserHome = ({fetchPosts,posts,setposts}) => {
  const location = useLocation();
  //const userData = JSON.parse(new URLSearchParams(location.search).get('userData'));
  const userData= JSON.parse(localStorage.getItem('userData'));
  const { username } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  // React.useEffect(() => {
  //   if (userData && username !== userData.username) {
  //     setShowModal(true);
  //   }
  // }, [username, userData]);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [username]);


  return (
   

    <div>

        {posts && posts.length ?<FeedUser 
                               userD ={userData}
                               profileImg={userData.p_image}
                               posts={posts}                               /> 
        :
        (<p style={{textAlign:"center",marginBottom:"40px"}}>
            NO POSTS ARE HERE
        </p>)
        }
    </div>
    
  )
}

export default UserHome 

