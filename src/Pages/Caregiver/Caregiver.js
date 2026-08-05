import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CFind from "../../Components/CaregiverSearch/CFind";
import Left from "../../Components/LeftSide/Left";
import Nav from '../../Components/Navigation/Nav';
import api from '../../util/api';
import '../styles/ModernUI.css';

const Caregiver = () => {
  const [caregiverlist, setCaregiverlist] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const fetchCaregivers = async () => {
    try {
      const response = await axios.get(`${api.url}:8001/caregiver`);
      setCaregiverlist(response.data || []);
      setFilteredList(response.data || []);
    } catch (error) {
      console.error('Error fetching caregiver data:', error);
    }
  };

  useEffect(() => {
    fetchCaregivers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setFilteredList(caregiverlist);
      return;
    }
    const q = search.toLowerCase();
    setFilteredList(
      caregiverlist.filter(c =>
        c.name?.toLowerCase().includes(q) ||
        c.hname?.toLowerCase().includes(q) ||
        c.location?.toLowerCase().includes(q) ||
        c.type?.toLowerCase().includes(q)
      )
    );
  };

  return (
    <div className='interface'>
      <Nav
        search={search}
        setSearch={setSearch}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      <div className="btw">
        <Left />
        <div className='fndlist container-fluid px-3 py-2'>
          {/* Hero Header */}
          <div className="page-hero-banner">
            <h1 className="page-hero-title">🩺 Caregiver & Elder Support</h1>
            <p className="page-hero-subtitle">
              Find verified medical caregivers, home nurses, and healthcare assistants tailored for seniors.
            </p>
          </div>

          {/* Glass Search Bar */}
          <div className="glass-search-card mb-4">
            <form onSubmit={handleSearch}>
              <div className="input-group search-input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search caregiver by name, hospital, specialization, or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn search-btn-gradient" type="submit">
                  🔍 Search Caregivers
                </button>
              </div>
            </form>
          </div>

          {/* Caregiver Grid */}
          {filteredList.length === 0 ? (
            <div className="text-center py-5 bg-white rounded-3 shadow-sm my-4">
              <h4 className="text-secondary fw-bold">No Caregivers Found</h4>
              <p className="text-muted">Try searching with a different location or medical specialization.</p>
            </div>
          ) : (
            <div className="cards-grid">
              {filteredList.map((caregiver) => (
                <CFind
                  key={caregiver.id}
                  caregiverlist={caregiverlist}
                  setCaregiverlist={setCaregiverlist}
                  caregiver={caregiver}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Caregiver;