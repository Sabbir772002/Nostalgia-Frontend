import Info from './ProfileComponents/InfoProfile/Info'
import UserHome from '../UserHome/UserHome'

import Profile from "../../assets/profile.jpg"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../Profile/ProfileMiddle.css"
import axios from 'axios'
import api from '../../util/api'

import moment from 'moment'
import ProfileInputPost from './ProfileComponents/ProfileInputPost'

const ProfileMiddle = ({following,
                        search,
                        images,
                        setImages,
                        profileImg,
                        setProfileImg,
                        userName,
                        setUserName,
                        userData,
                        setUserData,
                        userPostData,
                        setUserPostData,
                        fetchUserData
                    }) => {

  const [body,setBody] =useState("")
  const [importFile,setImportFile] =useState("")
  
 

  const handleSubmit =(e)=>{
    e.preventDefault()

  
    const id =userPostData.length ? userPostData[userPostData.length -1].id +1 :1
    const username="Vijay"
    const profilepicture=Profile
    const datetime=moment.utc(new Date(), 'yyyy/MM/dd kk:mm:ss').local().startOf('seconds').fromNow()
    const img= images ? {img:URL.createObjectURL(images)} : null

   
    const obj ={id:id,
               profilepicture:profilepicture,
               username:username,
               datetime:datetime,
               img:img && (img.img),
               body:body,
               like:0,
               comment:0
              }

    const insert =[...userPostData,obj]
    setUserPostData(insert)
    setBody("")
    setImages(null)
  }


  

  const [searchResults,setSearchResults] =useState("")
    
    useEffect(()=>{
      const searchData = userPostData.filter((val)=>(
        (val.body.toLowerCase().includes(search.toLowerCase()))
       ||
       (val.username.toLowerCase().includes(search.toLowerCase()))
       ))
       setSearchResults(searchData)
       
    },[userPostData,search]);

    const { username } = useParams();
    const [posts, setPosts] = useState([]);

    const fetchPosts = async() => {
      axios.get(`${api.url}:8000/singleblog`,
      {
        params: {
          username: username
        }
      })
      .then(response => {
          setPosts(response.data);
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
        });
    };

const user= JSON.parse(localStorage.getItem('userData'));
console.log("you are in profile page");
console.log(user.username);
console.log(username)
console.log(user);
if(user.username.includes("@")){
  return (
    <h2>You are not allowed to view this page!</h2>
  )
}else{
  return (
    <div className='profileMiddle'>
        <Info 
        userData ={userData}
        setUserData={setUserData}
        profileImg={profileImg}
        setProfileImg={setProfileImg}
        userPostData={userPostData}
        following={following}
        userName={userName}
        setUserName={setUserName}
        fetchUserData={fetchUserData}
        />
        {userData && user.username == userData.username &&(
        <ProfileInputPost
        userD={userData}
        profileImg={profileImg}
        handleSubmit={handleSubmit}
        body ={body}
        setBody ={setBody}
        importFile ={importFile}
        setImportFile ={setImportFile}
        images={images}
        setImages={setImages}
        fetchPosts={fetchPosts}
        />
        )}
       {(user.username==username) || (userData && userData.is_fnf === 1) ? (
        <UserHome
          fetchPosts={fetchPosts}
          setPosts={setPosts}
          userData={userData}
          profileImg={profileImg}
          setUserPostData={setUserPostData}
          userPostData={searchResults}
          images={images}
          posts={posts}
        />
) : (
  <h2>You are not allowed to view Post.!</h2>
)}

    </div>
  )
}
}

export default ProfileMiddle