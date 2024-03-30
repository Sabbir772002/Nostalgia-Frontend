import React, { useEffect, useState } from 'react'
import InputPost from '../Post/InputPost'
import Homepage from "../Home/Homepage"
import "./Middle.css"


const Middle = ({posts,fetchPosts}) => {
    
  
    const [searchResults,setSearchResults] =useState("")
    
    // useEffect(()=>{
    //   const searchData = posts.filter((val)=>(
    //     (val.body.toLowerCase().includes(search.toLowerCase()))
    //    ||
    //    (val.username.toLowerCase().includes(search.toLowerCase()))
    //    ))
    //    setSearchResults(searchData)
       
    // },[posts,search])
  
  return (
    <div className='M-features'>
        <InputPost
        // useEffect={useEffect}
        fetchPosts={fetchPosts}
        />
        <Homepage 
          posts={posts}
          fetchPosts={fetchPosts}
        />
    </div>
  )
}

export default Middle