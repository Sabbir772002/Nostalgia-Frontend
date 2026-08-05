import { useState, useEffect, useCallback } from 'react'
import Profile from "../../assets/profile.jpg"
import img1 from "../../assets/Post Images/img1.jpg"
import img2 from "../../assets/Post Images/img2.jpg"
import img3 from "../../assets/Post Images/img3.jpg"
import img4 from "../../assets/Post Images/img4.jpg"
import img5 from "../../assets/Post Images/img5.jpg"
import img6 from "../../assets/Post Images/img6.jpg"
import axios from 'axios'

import DPimg1 from "../../assets/DP/img1.jpg"
import DPimg2 from "../../assets/DP/img2.jpg"
import DPimg3 from "../../assets/DP/img3.jpg"
import DPimg4 from "../../assets/DP/img4.jpg"
import DPimg5 from "../../assets/DP/img5.jpg"
import DPimg6 from "../../assets/DP/img6.jpg"

import cover from "../../assets/Info-Dp/img-3.jpg"

import Cover1 from "../../assets/Friends-Cover/cover-1.jpg"
import Cover2 from "../../assets/Friends-Cover/cover-2.jpg"
import Cover3 from "../../assets/Friends-Cover/cover-3.jpg"
import Cover5 from "../../assets/Friends-Cover/cover-5.jpg"
import Cover7 from "../../assets/Friends-Cover/cover-7.jpg"
import Cover8 from "../../assets/Friends-Cover/cover-8.jpg"
import Cover9 from "../../assets/Friends-Cover/cover-9.jpg"

import Uimg1 from "../../assets/User-post/img1.jpg"
import Uimg2 from "../../assets/User-post/img2.jpg"
import Uimg3 from "../../assets/User-post/img3.jpg"

import "./NHome.css"
import Left from "../../Components/LeftSide/Left"
import NMiddle from "../NMiddle/NMiddle"
import Right from '../../Components/RightSide/Right'
import NNav from '../../Components/Navigation/nNav'
import moment from 'moment/moment';

import ServerUrl from '../../api/serverUrl';

const NHome = () => {
  const [posts, setPosts] = useState(() => {
    try {
      const cached = localStorage.getItem('cached_nhome_posts');
      return cached ? JSON.parse(cached) : [];
    } catch (e) {
      return [];
    }
  });

  const fetchPosts = useCallback(() => {
    axios.get(`${ServerUrl.BASE_URL}blog`)
      .then(response => {
        const freshPosts = response.data || [];
        setPosts(freshPosts);
        try {
          localStorage.setItem('cached_nhome_posts', JSON.stringify(freshPosts));
        } catch (e) {
          console.warn("LocalStorage caching error:", e);
        }
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
    
    
    

      const [search,setSearch] =useState("")
  const [following,setFollowing] =useState("")
  const [showMenu,setShowMenu] =useState(false)

  return (
    <div className='interface'>
        <NNav 
        search={search}
        setSearch={setSearch}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        /> 

    <div className="home">
   
        <Left />

        <NMiddle posts={posts} />

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

export default NHome