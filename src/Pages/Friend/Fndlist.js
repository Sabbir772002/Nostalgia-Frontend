import React, { useState, useEffect, useCallback } from 'react';
import FndVox from "../../Components/FriendList/FndVox";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import api from '../../util/api';
import '../styles/ModernUI.css';

const Fndbox = ({ fndlist, setfndlist, fetchfnd }) => {
  const [searchText, setSearchText] = useState('');
  const rawUser = JSON.parse(localStorage.getItem('userData')) || {};
  const activeUsername = rawUser.username ? (rawUser.username.includes('@') ? rawUser.username.split('@')[1] : rawUser.username) : '';
  const userData = { ...rawUser, username: activeUsername };
  const [fdlist, setFdlist] = useState([]);
  const [selectedOption, setSelectedOption] = useState('all');

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await axios.get(`${api.url}:8001/searchfndbox`, {
        params: {
          search: searchText,
          username: userData.username
        }
      });
      const usersData = response.data.users || [];
      setfndlist(usersData);
      setFdlist(usersData);
    } catch (error) {
      console.error('Search friends error:', error);
    }
  };

  const filterFriends = useCallback((option, list) => {
    const srcList = list || fndlist;
    if (option === "Known") {
      setFdlist(srcList.filter(fnd => fnd && fnd.type === "Known"));
    } else if (option === "Bondhu") {
      setFdlist(srcList.filter(fnd => fnd && fnd.type === "Bondhu"));
    } else {
      setFdlist(srcList);
    }
  }, [fndlist]);

  useEffect(() => {
    filterFriends(selectedOption, fndlist);
  }, [fndlist, selectedOption, filterFriends]);

  const handleSelectChange = (event) => {
    const val = event.target.value;
    setSelectedOption(val);
    filterFriends(val, fndlist);
  };

  return (
    <div className="fndlist container-fluid px-3 py-2">
      {/* Hero Header */}
      <div className="page-hero-banner">
        <h1 className="page-hero-title">My Network & Friends</h1>
        <p className="page-hero-subtitle">
          Manage your connected inner circle, category groups (Bondhu / Known), and start real-time chats.
        </p>
      </div>

      {/* Glass Search & Filter Panel */}
      <div className="glass-search-card">
        <form onSubmit={handleSearch}>
          <div className="input-group search-input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search your friends by name or handle..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="btn search-btn-gradient" type="submit">
              <i className="fa fa-search me-1"></i> Search Friends
            </button>
          </div>
        </form>

        <div className="d-flex align-items-center justify-content-between mt-3 pt-3 border-top">
          <div className="d-flex align-items-center">
            <span className="fw-bold text-dark me-2">Category Filter:</span>
            <select
              className="filter-pill-select"
              onChange={handleSelectChange}
              value={selectedOption}
            >
              <option value="all">ALL FRIENDS</option>
              <option value="Bondhu">BONDHU (CLOSE FRIENDS)</option>
              <option value="Known">KNOWN (ACQUAINTANCES)</option>
            </select>
          </div>

          <div className="badge bg-success px-3 py-2 rounded-pill" style={{ fontSize: '0.85rem' }}>
            {fdlist.length} Friends Connected
          </div>
        </div>
      </div>

      {/* Friends Cards Grid */}
      {fdlist.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-3 shadow-sm my-4">
          <h4 className="text-secondary fw-bold">No Friends in this Category</h4>
          <p className="text-muted">Explore the "Find Friends" tab to request and add new connections to your list.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {fdlist.map((fnd, index) => (
            <FndVox
              key={fnd.id || index}
              fndlist={fndlist}
              setfndlist={setfndlist}
              fnd={fnd}
              fetchfnd={fetchfnd}
              setFdlist={setFdlist}
              fdlist={fdlist}
              selectedOption={selectedOption}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Fndbox;