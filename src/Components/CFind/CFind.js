
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import img3 from "../../assets/User-post/img3.jpg";
import { useLocation } from 'react-router-dom';
import api from '../../util/api'

const CFind = ({caregiverlist,setCaregiverlist,caregiver}) => { 
  // Destructure props to directly access userData
  function aged(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    // If the birth month is greater than current month or both are same but birth day is greater than current day
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
  
    return age;
  }
    return (
        <Card className="text-center card-box" style={{ width: '300px',height: '540px' }}> 
        <Card.Body className="member-card pt-2 pb-2">
            <div className="thumb-lg member-thumb mx-auto">
              <img
                src={`${api.url}:8000/${caregiver.img}`}

                className="rounded-circle img-thumbnail"
                alt="profile-image"
              />
            </div>
            <div class="border rounded p-3 mt-2">
            <h4>{caregiver.name}</h4>
            <h6>{aged(caregiver.dob)} Years Old</h6>
    <h5 class="text-muted rounded border-black">{caregiver.type}</h5>
    <p class="text-muted">
        Experience: {caregiver.experience} Years
    </p> 
    <p class="text-muted">
        {caregiver.gender} | <span className="text-primary">0{caregiver.phone} </span><span><a href="#" class="text-pink"></a></span>
    </p> 
    <p class="text-muted">
        Hospital: {caregiver.hname} <span> </span
        ><span><a href="#" class="text-pink"></a></span>
    </p>
    <p class="text-muted">
        {caregiver.branch} | {caregiver.location} | {caregiver.thana}
    </p>
</div>


            <div>
             
            
            </div>
          </Card.Body>
        </Card>
      );
};

export default CFind;
