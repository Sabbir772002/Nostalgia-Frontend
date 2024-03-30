import React from 'react'
import "../Navigation/Nav.css"
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

import {AiOutlineHome} from "react-icons/ai"
import {LiaUserFriendsSolid} from "react-icons/lia"

const Nav = ({search,setSearch,setShowMenu}) => {
//const userData = JSON.parse(localStorage.getItem('userData'));

  return (
    <nav>
        <div className="n-logo">
            <Link to="/home" className='logo' style={{color:"black",textDecoration:"none"}}>
              <h1>Nostalgia</h1>
            </Link>
        </div>

      <div className="n-form-button" >

        <form className='n-form' onSubmit={(e)=>e.preventDefault()} >
          <SearchIcon className='search-icon'/>
          <input type="text" 
          placeholder='Search post'
          id='n-search'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          />
        </form>
      </div>

      <div className="n-buttons">
        <Link to="/login" className="n-button">Login</Link>
        <Link to="/signup" className="n-button">Signup</Link>
      </div>    
    </nav>
  )
}

export default nNav