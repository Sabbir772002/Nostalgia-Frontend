import React, { useEffect, useState } from 'react'
import InputPost from '../Post/InputPost'
import Homepage from "../GHome/Homepage"
import "../MiddleSide/Middle.css"
import ShowGroup from "./RightGroup/ShowGroup.js"


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
      <h1 className='mt-3 bg-light rounded text-black'> Group Timeline</h1>
        <Homepage 
          posts={posts}
          fetchPosts={fetchPosts}
        />
    </div>
  )
}

export default Middle