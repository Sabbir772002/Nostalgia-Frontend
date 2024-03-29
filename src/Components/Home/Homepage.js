import React from 'react'
import Feedposts from './Feedposts'
import "../Home/Homepage.css"


const Homepage = ({posts}) => {
  return (
    <main className='homepage'>
        
        {posts.length ? <Feedposts 
                        posts={posts}
                        /> 
        :
        (<p style={{textAlign:"center",marginTop:"40px"}}>
            NO POSTS ARE HERE
        </p>)
        }
    </main>
  )
}

export default Homepage