import React from 'react';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import api from '../../util/api';
import '../../Pages/styles/ModernUI.css';

const FriendCard = ({ fndlist, setfndlist, fnd, fetchfnd }) => {
  const userData = JSON.parse(localStorage.getItem('userData')) || {};

  const updatefnf = async (option) => {
    if (!option) return;
    try {
      await axios.post(`${api.url}:8001/update_fnf`, {
        user_id: userData.id,
        friend_id: fnd.id,
        type: option
      });
      if (setfndlist && fndlist) {
        setfndlist(fndlist.map(fd => fd.id === fnd.id ? { ...fd, type: option } : fd));
      }
      if (fetchfnd) fetchfnd();
    } catch (error) {
      console.error('Error updating friend category:', error);
    }
  };

  const handleSelect = (option) => {
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
        </div>

        <Link to={`/profile/${fnd.username}`} className="text-decoration-none">
          <h4 className="card-user-name text-center text-dark">{fnd.first_name} {fnd.last_name}</h4>
        </Link>
        <p className="card-user-handle text-center">@{fnd.username}</p>

        <div className="text-center">
          <span className="card-info-pill">
            🏷️ {fnd.type || 'Friend'}
          </span>
        </div>
      </div>

      <div className="card-actions-wrapper">
        <DropdownButton
          title={fnd.type || "Category"}
          variant="outline-secondary"
          className="flex-1"
          onSelect={handleSelect}
        >
          <Dropdown.Item eventKey="Known">Known</Dropdown.Item>
          <Dropdown.Item eventKey="Bondhu">Bondhu</Dropdown.Item>
        </DropdownButton>

        <Link to={`/chat/${fnd.username}`} className="flex-1">
          <Button className="btn-modern-primary w-100">
            💬 Message
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;
