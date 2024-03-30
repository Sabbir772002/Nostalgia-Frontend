import React from 'react'
import Post from './Post'

const Feedposts = ({posts}) => {
  return (
    <div className='feedposts'>
        {posts.map((post)=>(
            <Post 
            posts={posts}
            post ={post}
             key={post.id} 
            />
        ))}
    </div>
  )
}

export default Feedposts