import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Sugg.css";
import { Link } from 'react-router-dom';
import ServerUrl, { getImageUrl } from '../../../../api/serverUrl';
import ProfileDefaultImg from "../../../../assets/profile.jpg";

const Friends = () => {
  const rawUser = JSON.parse(localStorage.getItem('userData')) || {};
  const activeUsername = rawUser.username ? (rawUser.username.includes('@') ? rawUser.username.split('@')[1] : rawUser.username) : '';
  const user = { ...rawUser, username: activeUsername };

  const [fndlist, setfndlist] = useState([]);

  const fetchOverseerList = useCallback(() => {
    if (!user.id) return;
    axios.get(`${ServerUrl.BASE_URL}friends`, {
      params: {
        user_id: user.id
      }
    })
      .then(response => {
        setfndlist(response.data.users || []);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [user.id]);

  useEffect(() => {
    fetchOverseerList();
  }, [fetchOverseerList]);

  return (
    <div className="Sugg-comp">
      <h2 className="mt-3 font-weight-bold fs-5 mb-3">Your Friends</h2>
      {fndlist && fndlist.slice(0, 7).map((fnd, index) => (
        <div className="sugg-people" key={index}>
          <div className="s-left">
            <img
              src={getImageUrl(fnd.pp || fnd.p_image)}
              alt={fnd.first_name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = ProfileDefaultImg;
              }}
            />
            <h3>{fnd.first_name} {fnd.last_name}</h3>
          </div>

          <div className="s-right d-flex gap-2">
            <Link to={`/profile/${fnd.username}`}>
              <button className="btn-modern-primary py-1 px-3">View</button>
            </Link>
            <Link to={`/chat/${fnd.username}`}>
              <button className="btn-modern-outline py-1 px-3">Message</button>
            </Link>
          </div>
        </div>
      ))}
      <div className="text-center mt-3">
        <Link to='/friend'>
          <button className="btn-modern-primary w-100 py-2">ALL Friends</button>
        </Link>
      </div>
    </div>
  );
};

export default Friends;