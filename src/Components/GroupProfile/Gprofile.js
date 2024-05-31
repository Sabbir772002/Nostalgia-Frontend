import Info from '../GroupProfile/ProfileComponents/InfoProfile/Info'
import UserHome from '../GroupHome/UserHome'
import Profile from "../../assets/profile.jpg"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../Profile/ProfileMiddle.css"
import moment from 'moment'
import ProfileInputPost from './ProfileComponents/ProfileInputPost'

const GProfile = ({following,
                        search,
                        images,
                        setImages,
                        profileImg,
                        gprofile,
                        fetchPosts,
                        posts,
                        setPosts,
                        group}) => {
  const [body,setBody] =useState("")
  const [importFile,setImportFile] =useState("")
  const handleSubmit =(e)=>{
    e.preventDefault()
  }
  const [searchResults,setSearchResults] =useState("")
   const userData= JSON.parse(localStorage.getItem('userData'));
  return (
    <div className='profileMiddle'>
        <Info 
        group={group}
        gprofile={gprofile}
        />
        {group && group.member == 1 &&(
        <ProfileInputPost
        handleSubmit={handleSubmit}
        group={group}
        user={userData}
        fmembers={gprofile}
        fetchPosts={fetchPosts}
        />
        )} 
        
        <UserHome
        fetchPosts={fetchPosts}
        group={group}
        posts={posts}
        setposts={setPosts}
        /> 
    </div>
  )
}

export default GProfile