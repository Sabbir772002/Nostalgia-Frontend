import React, { useState } from 'react';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../../util/api';
import '../../Pages/styles/ModernUI.css';

const FindFriendCard = ({ fndlist, setfndlist, fnd, fetchData }) => {
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const [selectedOption, setSelectedOption] = useState("Accept");

  const add_fnf = async () => {
    try {
      await axios.post(`${api.url}:8001/add_fnf`, {
        user_id: userData.id,
        friend_id: fnd.id,
        type: "Sent"
      });
      if (fetchData) fetchData();
    } catch (error) {
      console.error(error.response?.data?.message || "Error sending request");
    }
  };

  const delete_fnd = async () => {
    try {
      await axios.post(`${api.url}:8001/delete_fnd`, {
        user_id: userData.id,
        friend_id: fnd.id,
        type: "Sent"
      });
      if (fetchData) fetchData();
    } catch (error) {
      console.error(error.response?.data?.message || "Error deleting request");
    }
  };

  const updatefnf = async (option) => {
    if (!option) return;
    try {
      await axios.post(`${api.url}:8001/update_fnf`, {
        user_id: userData.id,
        friend_id: fnd.id,
        type: option
      });
      if (fetchData) fetchData();
    } catch (error) {
      console.error('Error updating friend status:', error);
    }
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    updatefnf(option);
  };

  const imgUrl = fnd.pp ? `${api.url}:8001/${fnd.pp}` : `${api.url}:8001/media/image/download_lX6bjA6.jpeg`;

  return (
    <div className="modern-user-card">
      <div>
        <div className="card-avatar-wrapper">
          <img
            src={imgUrl}
            className="card-avatar-img"
            alt={fnd.username}
            onError={(e) => { e.target.onerror = null; e.target.src = `${api.url}:8001/media/image/download_lX6bjA6.jpeg`; }}
          />
          {fnd.similarity_score !== undefined && fnd.similarity_score !== null && (
            <span className="badge-vector-match">
              Match: {fnd.similarity_score}%
            </span>
          )}
        </div>

        <h4 className="card-user-name text-center">{fnd.first_name} {fnd.last_name}</h4>
        <p className="card-user-handle text-center">@{fnd.username}</p>

        {fnd.thana && (
          <div className="text-center">
            <span className="card-info-pill">
              📍 {fnd.thana}
            </span>
          </div>
        )}
      </div>

      <div className="card-actions-wrapper">
        {fnd && fnd.good === userData.username ? (
          <Button variant="outline-danger" className="btn-modern-outline text-danger flex-1" onClick={delete_fnd}>
            Undo
          </Button>
        ) : (
          <>
            {fnd && fnd.status === 1 ? (
              <DropdownButton
                title={selectedOption || "Category"}
                variant="outline-primary"
                className="flex-1"
                onSelect={handleSelect}
              >
                <Dropdown.Item eventKey="Known">Known</Dropdown.Item>
                <Dropdown.Item eventKey="Bondhu">Bondhu</Dropdown.Item>
                <Dropdown.Item eventKey="Delete">Delete</Dropdown.Item>
              </DropdownButton>
            ) : (
              <Button className="btn-modern-primary flex-1" onClick={add_fnf}>
                + Request
              </Button>
            )}
          </>
        )}

        <Link to={`/profile/${fnd.username}`} className="flex-1">
          <Button className="btn-modern-outline w-100">
            Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FindFriendCard;
