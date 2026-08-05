import React, { useEffect } from 'react';
import FeedUser from './FeedUser';

const UserHome = ({fetchPosts,posts,setposts}) => {
  const userData = JSON.parse(localStorage.getItem('userData')) || {};

  useEffect(() => {
    if (fetchPosts) fetchPosts();
  }, [fetchPosts]);


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

