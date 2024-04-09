import React, { useEffect, useState } from 'react'
import Homepage from "../../Components/NHome/Homepage"
import "./NMiddle.css"


const NMiddle = ({posts,fetchPosts}) => {
    
  
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
              <Homepage 
          posts={posts}
          fetchPosts={fetchPosts}
        />
    </div>
  )
}

export default NMiddle