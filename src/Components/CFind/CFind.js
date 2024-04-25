
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import img3 from "../../assets/User-post/img3.jpg";
import { useLocation } from 'react-router-dom';

<<<<<<< HEAD
const CFind = ({caregiverlist,setCaregiverlist,caregiver}) => { 
  // Destructure props to directly access userData
   

=======

const CFind = ({caregiverlist,setCaregiverlist,caregiver}) => {
   // Destructure props to directly access userData
>>>>>>> f28e558279b88ec3230f58090aff30ead7e3da13
    return (
        <Card className="text-center card-box" style={{ width: '300px',height: '460px' }}> 
        <Card.Body className="member-card pt-2 pb-2">
            <div className="thumb-lg member-thumb mx-auto">
              <img
                src= {`http://localhost:8000/${caregiver.img}`}

                className="rounded-circle img-thumbnail"
                alt="profile-image"
              />
            </div>
            <div>
              <h4>{caregiver.name}</h4>
              <p className="text-muted">
                @{caregiver.phone} <span> </span
                ><span><a href="#" className="text-pink"></a></span>
              </p>
            </div>
            <ul className="social-links list-inline">
              <li className="list-inline-item">
                <a
                  title=""
                  data-placement="top"
                  data-toggle="tooltip"
                  className="tooltips"
                  href=""
                  data-original-title="Facebook"
                  ><i className="fa fa-facebook"></i
                ></a>
              </li>
              <li className="list-inline-item">
                <a
                  title=""
                  data-placement="top"
                  data-toggle="tooltip"
                  className="tooltips"
                  href=""
                  data-original-title="Twitter"
                  ><i className="fa fa-twitter"></i
                ></a>
              </li>
              <li className="list-inline-item">
                <a
                  title=""
                  data-placement="top"
                  data-toggle="tooltip"
                  className="tooltips"
                  href=""
                  data-original-title="Skype"
                  ><i className="fa fa-skype"></i
                ></a>
              </li>
            </ul>
            <div>
              <Button variant="secondary" className="mt-3 btn-rounded waves-effect w-md waves-light m-1">
                Request Now
              </Button>
              <Link to={`/profile/${caregiver.name}`}>
             
              <Button variant="secondary" className="mt-3 btn-rounded waves-effect w-md waves-light m-1">
                View Profile
              </Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      );
};

export default CFind;
