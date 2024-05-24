import React from 'react';
import Card from 'react-bootstrap/Card';
import {Dropdown,DropdownButton,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './FindF.css';
// Import the image
import img3 from "../../assets/User-post/img3.jpg";
import { Link } from 'react-router-dom';

const FindF = ({fndlist,setfndlist,fnd,fetchData}) => { // Destructure props to directly access userData
    const userData= JSON.parse(localStorage.getItem('userData'));
    const [selectedOption, setSelectedOption] = React.useState("Accept");
    const add_fnf = async () => {
      try {
          const response = await axios.post('http://localhost:8000/add_fnf', {
              user_id: userData.id,
              friend_id: fnd.id,
              type: "Sent"
          });
          alert("Friend Request Sent successfully")
          fetchData();
          console.log(response.data.message); // Log the response message
          // You may update UI state or perform other actions after successful request
      } catch (error) {
          alert(error.response.data.message)
          console.error('Error:', error);
          // Handle errors if any
      }
  };

   const delete_fnd = async () => {
    try {
        
        const response = await axios.post('http://localhost:8000/delete_fnd', {
            user_id: userData.id,
            friend_id: fnd.id,
            type: "Sent"
        });
        alert("Friend Request Delete successfully")
        fetchData();
        console.log(response.data.message); // Log the response message
        // You may update UI state or perform other actions after successful request
    } catch (error) {
        alert(error.response.data.message)
        console.error('Error:', error);
        // Handle errors if any
    }
};
const updatefnf = async (option) => {
  try {
      if( option == "" ){ 
          return;
      }
      const response = await axios.post('http://localhost:8000/update_fnf', {
          user_id: userData.id,
          friend_id: fnd.id,
          type: option
      });
      alert("Friend Update successfully")
      fetchData(setfndlist);
      console.log(response.data.message); // Log the response message
      // You may update UI state or perform other actions after successful request
  } catch (error) {
      alert(error.response.data.message)
      console.error('Error:', error);
      // Handle errors if any
  }
};
const handleSelect = (option) => {
  setSelectedOption(option);
  updatefnf(option);
};

        return (
        <Card className="text-center card-box" style={{ width: '330px',height: '460px' }}> 
        <Card.Body className="member-card pt-2 pb-2">
            <div className="thumb-lg member-thumb mx-auto">
              <img
                src={`http://localhost:8000/${fnd.pp}`}
                className="rounded-circle img-thumbnail"
                alt="profile-image"
                style={{ width: '200px', height: '200px' }}
              />
            </div>
            <div>
              <h4>{fnd.first_name} {fnd.last_name}</h4>
              <p className="text-muted">
                @{fnd.username} <span> </span
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
            <div className="row">
              <div className="col-6">
            <>
            {fnd && fnd.good === userData.username ? (
                <Button variant="secondary" className="mt-3 btn-rounded waves-effect w-md waves-light m-1 disabled-button" onClick={delete_fnd}>
                    Undo
                </Button>
            ) : (
              <>
              {fnd && fnd.status == 1 ? (
                <DropdownButton
                title={selectedOption || "Select Option"}
                variant="secondary"
                className="mt-3 btn-rounded waves-effect w-md waves-light m-1"
                onSelect={handleSelect}
            >
                <Dropdown.Item eventKey="Known">Known</Dropdown.Item>
                <Dropdown.Item eventKey="Bondhu">Bondhu</Dropdown.Item>
                <Dropdown.Item eventKey="Delete">Delete</Dropdown.Item>
            </DropdownButton>
              ) : (
                  <Button variant="secondary" className="mt-3 btn-rounded waves-effect w-md waves-light m-1" onClick={add_fnf}>
                      Request
                  </Button>
              )}
          </>

            )}
        </>
        </div>
            <div className="col-6">
              <Link to={`/profile/${fnd.username}`}>
              <Button variant="secondary" className="mt-3 btn-rounded waves-effect w-md waves-light m-1">
                View Profile
              </Button>
              </Link>
              </div>
            </div>
          </Card.Body>
        </Card>
      );
};

export default FindF;
