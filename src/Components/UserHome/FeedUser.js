import React from 'react'
import PostUser from './PostUser'

const FeedUser = ({posts,setPosts,profileImg,userD,images}) => {
  return (
    <div className='feedposts'>
        {posts.map((post)=>(
            <PostUser 
            images={images}
            userD={userD}
            profileImg={profileImg}
            posts={posts}
            post ={post}
            setPosts={setPosts}
            key={post.id} 
            />
        ))}
    </div>
  )
}

export default FeedUser