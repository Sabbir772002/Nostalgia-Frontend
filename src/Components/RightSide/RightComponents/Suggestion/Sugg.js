import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Sugg.css";
import { Link } from 'react-router-dom';
import ServerUrl, { getImageUrl } from '../../../../api/serverUrl';
import ProfileDefaultImg from '../../../../assets/profile.jpg';

const Sugg = () => {
  const rawUser = JSON.parse(localStorage.getItem('userData')) || {};
  const activeUsername = rawUser.username ? (rawUser.username.includes('@') ? rawUser.username.split('@')[1] : rawUser.username) : '';
  const user = { ...rawUser, username: activeUsername };

  const [fndlist, setfndlist] = useState([]);

  const fetchOverseerList = useCallback(() => {
    axios.get(`${ServerUrl.BASE_URL}friendsugg`, {
      params: {
        user_id: user.id,
        username: user.username
      }
    })
      .then(response => {
        setfndlist(response.data.users || []);
      }) 
      .catch(error => {
        console.error('Error fetching suggestion data:', error);
      });
  }, [user.id, user.username]);

  useEffect(() => {
    fetchOverseerList();
  }, [fetchOverseerList]);

  return (
    <div className="Sugg-comp">
      <h2 className="mt-3 font-weight-bold fs-5 mb-3">People You May Know</h2>
      {fndlist && fndlist.slice(0, 5).map((fnd, index) => (
        <div className="sugg-people" key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div className="s-left" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={getImageUrl(fnd.pp || fnd.p_image)}
              alt={fnd.first_name}
              style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = ProfileDefaultImg;
              }}
            />
            <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>{fnd.first_name || fnd.username} {fnd.last_name || ''}</h3>
          </div>

          <div className="s-right d-flex gap-2">
            <Link to={`/profile/${fnd.username}`}>
              <button className="btn-modern-primary py-1 px-3" style={{ fontSize: '0.8rem' }}>View</button>
            </Link>
          </div>
        </div>
      ))}
      <div className="text-center mt-3">
        <Link to='/findfriend'>
          <button className="btn-modern-primary w-100 py-2">Find More Friends</button>
        </Link>
      </div>
    </div>
  );
};

export default Sugg;