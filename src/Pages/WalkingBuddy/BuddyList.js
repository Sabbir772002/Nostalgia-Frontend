import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import CFind from "../../Components/CFind/CFind"
import { useLocation } from 'react-router-dom';
import "../Caregiver/Caregiver.css"
import Left from "../../Components/LeftSide/Left"
import Middle from "../../Components/MiddleSide/Middle"
import Right from '../../Components/RightSide/Right'
import Nav from '../../Components/Navigation/Nav'
import moment from 'moment/moment'
const Caregiver = () => {
  const location = useLocation();
  //const userData = JSON.parse(new URLSearchParams(location.search).get('userData'));
  const userData= JSON.parse(localStorage.getItem('userData'));
 // console.log(userData);
      
     const [caregiverlist, setCaregiverlist] = useState([]);
      useEffect(() => {
          // Fetch data from Django backend
          axios.get('http://localhost:8000/friends')
              .then(response => {
                 // console.log("mere fnd");
                 // console.log(response.data.users);
                  setCaregiverlist(response.data.users);
                 // console.log(fndlist);
              })
              .catch(error => {
                  console.error('Error fetching data:', error);
              });
      }, []);
      const [search,setSearch] =useState("");
  
const [following,setFollowing] =useState("");
      
const [showMenu,setShowMenu] =useState(false);
const [images,setImages] =  useState(null);
     const [body,setBody] =useState("");
     const [importFile,setImportFile] =useState("");
  return (
    <div className='interface'>
  <Nav 
  search={search}
  setSearch={setSearch}
  showMenu={showMenu}
  setShowMenu={setShowMenu}
  />    <div className="home">
   
        <Left/>
<div className='fndlist'>
        {caregiverlist.map((caregiver)=>(
             <div className="d-inline-flex p-4">

            <CFind 
            caregiverlist={caregiverlist}
            setCaregiverlist={setCaregiverlist}
            caregiver ={caregiver}
            />
            </div>
        ))}
        </div>
    </div>   
    </div>
  )
}

export default Caregiver;