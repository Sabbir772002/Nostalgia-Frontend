import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import FindFriendCard from "../../Components/FindFriends/FindFriendCard";
import PageHeader from '../../Components/Common/PageHeader';
import SearchBar from '../../Components/Common/SearchBar';
import Left from "../../Components/LeftSide/Left";
import Nav from '../../Components/Navigation/Nav';
import api from '../../util/api';
import '../styles/ModernUI.css';

const FindFriendlist = () => {
  const [searchText, setSearchText] = useState('');
  const [searchWithImages, setSearchWithImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const rawUser = JSON.parse(localStorage.getItem('userData')) || {};
  const activeUsername = rawUser.username ? (rawUser.username.includes('@') ? rawUser.username.split('@')[1] : rawUser.username) : '';
  const userData = { ...rawUser, username: activeUsername };
  const [fndlist, setfndlist] = useState([]);
  const [fdlist, setfdlist] = useState([]);
  const [selectedOption, setSelectedOption] = useState('all');
  const [searchNav, setSearchNav] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const fetchData = useCallback(async () => {
    if (!userData.username && !userData.id) return;
    try {
      const response = await axios.get(`${api.url}:8001/findfriend`, {
        params: { user_id: userData.id || userData.username }
      });
      const list = response.data.users || [];
      setfndlist(list);
      setfdlist(list);
    } catch (error) {
      console.error('Error fetching findfriend list:', error);
    }
  }, [userData.username, userData.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (searchWithImages && !selectedImage) {
      alert("Please upload an image file for AI Vector Search.");
      return;
    }
    try {
      const url = `${api.url}:8001/searchfnd`;
      let response;
      if (searchWithImages && selectedImage) {
        const formData = new FormData();
        formData.append('search', searchText);
        formData.append('username', userData.username);
        formData.append('image', selectedImage);
        response = await axios.post(url, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        response = await axios.get(url, {
          params: { search: searchText, username: userData.username }
        });
      }
      const usersData = response.data.users || [];
      setfndlist(usersData);
      setfdlist(usersData);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const filterList = (option, list) => {
    const sourceList = list || fndlist;
    if (option === "requested") {
      setfdlist(sourceList.filter((fnd) => fnd && fnd.good === userData.username));
    } else if (option === "request") {
      setfdlist(sourceList.filter((fnd) => fnd && fnd.abedon === 0 && fnd.status === 1));
    } else {
      setfdlist(sourceList);
    }
  };

  const handleSelectChange = (event) => {
    const val = event.target.value;
    setSelectedOption(val);
    filterList(val, fndlist);
  };

  return (
    <div className='interface'>
      <Nav search={searchNav} setSearch={setSearchNav} showMenu={showMenu} setShowMenu={setShowMenu} />
      <div className="btw">
        <Left />
        <div className='fndlist container-fluid px-3 py-2'>
          <PageHeader
            title="Find Friends & Connections"
            subtitle="Search nostalgic connections by name, username, or AI Profile Image Matching."
          />

          <SearchBar
            placeholder="Search by name, username, or location..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSubmit={handleSearch}
            buttonText="Search"
          >
            <div className="form-check form-switch d-flex align-items-center mt-2">
              <input
                type="checkbox"
                className="form-check-input me-2"
                id="searchWithImagesMain"
                checked={searchWithImages}
                onChange={() => setSearchWithImages(!searchWithImages)}
                style={{ cursor: 'pointer' }}
              />
              <label className="form-check-label text-dark fw-semibold" htmlFor="searchWithImagesMain" style={{ cursor: 'pointer' }}>
                Enable Profile Image Matching (Vector Search)
              </label>
            </div>

            {searchWithImages && (
              <div className="mt-2 p-3 bg-light rounded border">
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => e.target.files && setSelectedImage(e.target.files[0])}
                />
              </div>
            )}

            <div className="d-flex align-items-center justify-content-between mt-3 pt-3 border-top">
              <div className="d-flex align-items-center">
                <span className="fw-semibold text-dark me-2">Sort Filter:</span>
                <select className="filter-pill-select" onChange={handleSelectChange} value={selectedOption}>
                  <option value="all">ALL USERS</option>
                  <option value="requested">REQUESTS SENT</option>
                  <option value="request">FRIEND REQUESTS</option>
                </select>
              </div>
              <span className="badge bg-secondary px-3 py-2">
                {fdlist.length} Matches Found
              </span>
            </div>
          </SearchBar>

          {fdlist.length === 0 ? (
            <div className="text-center py-5 bg-white rounded shadow-sm my-3">
              <h5 className="text-secondary fw-semibold">No Connections Found</h5>
            </div>
          ) : (
            <div className="cards-grid">
              {fdlist.map((fnd, idx) => (
                <FindFriendCard
                  key={fnd.id || idx}
                  fndlist={fndlist}
                  setfndlist={setfndlist}
                  fnd={fnd}
                  fetchData={fetchData}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindFriendlist;
