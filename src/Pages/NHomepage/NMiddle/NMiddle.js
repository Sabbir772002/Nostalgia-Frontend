import React, { useEffect, useState } from 'react'
<<<<<<<< HEAD:src/Pages/NHomepage/NMiddle/NMiddle.js
import Homepage from "./NHomepage/NHome"
========
import Homepage from "../../Components/NHome/Homepage"
>>>>>>>> dc7a6a607ba1bf26161e2829471b7f87d30b584c:src/Pages/NMiddle/NMiddle.js
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
<<<<<<<< HEAD:src/Pages/NHomepage/NMiddle/NMiddle.js
        
========

>>>>>>>> dc7a6a607ba1bf26161e2829471b7f87d30b584c:src/Pages/NMiddle/NMiddle.js
        <Homepage 
          posts={posts}
          fetchPosts={fetchPosts}
        />
    </div>
  )
}

export default NMiddle