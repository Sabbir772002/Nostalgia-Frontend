import React from 'react'
import FeedUser from './FeedUser'


const UserHome = ({setUserPostData,userPostData,profileImg,userD,images}) => {
  return (
    <div>
        {userPostData.length ? <FeedUser 
                               userD ={userD}
                               profileImg={profileImg}
                               posts={userPostData}
                               setPosts={setUserPostData}
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

