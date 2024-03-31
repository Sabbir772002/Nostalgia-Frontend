import React from 'react'
import "../Navigation/Nav.css"
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Importing a profile icon from React Icons
import {AiOutlineHome} from "react-icons/ai"
import {LiaUserFriendsSolid} from "react-icons/lia"
import { RiProfileLine } from 'react-icons/ri';
import { BsPeople } from 'react-icons/bs';

const NNav = ({search,setSearch,setShowMenu}) => {
const userData = JSON.parse(localStorage.getItem('userData'));

  return (
    <nav>
        <div className="n-logo">
            {userData ? (
      <Link to="/home" className='logo' style={{color:"black",textDecoration:"none"}}>
        <h1>Nostalgia</h1>
      </Link>
    ) : (
      <Link to="/nhome" className='logo' style={{color:"black",textDecoration:"none"}}>
        <h1>Nostalgia</h1>
      </Link>
    )}

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

      <div className="n-profile" >
          {/* <Link to="/profile">  */}
           <Link to="/">
         <FaUserCircle style={{ fontSize: '24px', marginBottom: '8px',color: 'black' }} />

          </Link>
      </div>   
    </nav>
  )
}

export default NNav