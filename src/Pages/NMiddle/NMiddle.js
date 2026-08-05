import React from 'react';
import Homepage from "../../Components/NHome/Homepage";
import "./NMiddle.css";

const NMiddle = ({posts,fetchPosts}) => {
    
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