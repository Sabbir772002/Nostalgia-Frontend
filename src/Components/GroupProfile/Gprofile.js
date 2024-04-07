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
                        setProfileImg,
                        name,
                        setName,
                        userName,
                        setUserName,
                        group,
                        setgroup, 
                        userPostData,
                        setUserPostData}) => {

  const [body,setBody] =useState("")
  const [importFile,setImportFile] =useState("")
  
  const handleSubmit =(e)=>{
    e.preventDefault()

  }


  

  const [searchResults,setSearchResults] =useState("")
    
    useEffect(()=>{
      const searchData = userPostData.filter((val)=>(
        (val.body.toLowerCase().includes(search.toLowerCase()))
       ||
       (val.username.toLowerCase().includes(search.toLowerCase()))
       ))
       setSearchResults(searchData)
       
    },[userPostData,search])

   const userData= JSON.parse(localStorage.getItem('userData'));
  return (
    <div className='profileMiddle'>
        <Info 
        group={group}
        setgroup={setgroup} 
        />
        {/* {userData && userD.username == userData.username &&(
        <ProfileInputPost
        userD={userD}
        profileImg={profileImg}
        handleSubmit={handleSubmit}
        body ={body}
        setBody ={setBody}
        importFile ={importFile}
        setImportFile ={setImportFile}
        images={images}
        setImages={setImages}
        />
        )} */}
        
        <UserHome 
        group={group}
        profileImg={profileImg}
        setUserPostData={setUserPostData}
        userPostData={searchResults}
        images={images}
        />
    </div>
  )
}

export default GProfile