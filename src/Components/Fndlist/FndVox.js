import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import img3 from "../../assets/User-post/img3.jpg";
import axios from 'axios';
import api from '../../util/api';
const FndVox = ({ fndlist, setfndlist, fnd, fetchfnd }) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [selectedOption, setSelectedOption] = useState(fnd.type);
    console.log(fnd);

    const updatefnf = async (option) => {
        try {
            if( option == "" ){ 
                return;
            }
            const response = await axios.post(`${api.url}:8000/update_fnf`, {
                user_id: userData.id,
                friend_id: fnd.id,
                type: option
            });
            alert("Friend Update successfully")
            fetchfnd(setfndlist);
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
        updatefnf(option); // Call updatefnf automatically when an option is selected
    };

    return (
        <Card className="text-center card-box" style={{ width: '320px', height: '460px' }}>
            <Card.Body className="member-card pt-2 pb-2">
                <div className="thumb-lg member-thumb">
                    <img
                        src={`${api.url}:8000/${fnd.pp}`}
                        className="rounded-circle"
                        alt="profile-image"
                        width="200"
                        height="200"
                    />
                </div>
                <div>
                    <h4>{fnd.first_name} {fnd.last_name}</h4>
                    <p className="text-muted">
                        @{fnd.username}
                    </p>
                </div>
                <ul className="social-links list-inline">
                    {/* Your social media links */}
                </ul>
                <div className="row">
                    <div className="col-6">
                    <DropdownButton
                        title={selectedOption}
                        variant="secondary"
                        className="mt-3 btn-rounded waves-effect w-md waves-light m-1"
                        onSelect={handleSelect}
                    >
                        {/* {(fnd.abedon == 1 && fnd.is_fnf == 0) && (
                            <Dropdown.Item eventKey="Accept">Accept</Dropdown.Item>
                        )} */}
                        <Dropdown.Item eventKey="Known">Aquaintance</Dropdown.Item>
                        <Dropdown.Item eventKey="Bondhu">Friend</Dropdown.Item>
                    </DropdownButton>
                    </div>
                    <div className="col-6">
                    <Link to={`/profile/${fnd.username}`}>
                        <Button
                            variant="secondary"
                            className="mt-3 btn-rounded waves-effect w-md waves-light m-1"
                        >
                            View Profile
                        </Button>
                    </Link>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default FndVox;
