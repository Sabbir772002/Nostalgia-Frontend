import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Sugg.css";
import { Link } from 'react-router-dom';
import api from '../../../util/api';

const Sugg = () => {
  const user = JSON.parse(localStorage.getItem('userData')) || {};
  const [fndlist, setfndlist] = useState([]);

  const fetchgrouplist = useCallback(() => {
    if (!user.id) return;
    axios.get(`${api.url}:8001/!my_groups`, {
      params: {
        user_id: user.id
      }
    })
      .then(response => {
        setfndlist(response.data || []);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [user.id]);

  useEffect(() => {
    fetchgrouplist();
  }, [fetchgrouplist]);

  const Join = async (guser) => {
    try {
      const response = await axios.post(`${api.url}:8001/join_group`, {
        user_id: user.id,
        group: guser,
        type: "join"
      });
      if (response.data && response.data.ok === 0) {
        alert("You are already a member of this group");
        return;
      }
      fetchgrouplist();
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  return (
    <div className="Sugg-comp">
      <h2 className="mt-3 font-weight-bold fs-5 mb-3">Group Suggestions</h2>

      {fndlist.map((group, index) => (
        <div className="sugg-people" key={index}>
          <div className="s-left">
            <img src={`${api.url}:8001/${group.img}`} alt={group.name} />
            <h3>{group.name}</h3>
          </div>

          <div className="s-right d-flex gap-2">
            <Link to={`/group/${group.username}`}>
              <button className="btn-modern-primary py-1 px-3">View</button>
            </Link>
            <button className="btn-modern-outline py-1 px-3" onClick={() => Join(group.username)}>
              Join
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sugg;
