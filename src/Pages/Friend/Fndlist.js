import React, { useState, useEffect } from 'react';
import FndVox from "../../Components/Fndlist/FndVox";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import  api from '../../util/api';

const Fndbox = ({ fndlist, setfndlist, fetchfnd }) => { 
  const [searchText, setSearchText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [fdlist, setFdlist] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${api.url}:8000/searchfndbox`, {
        params: {
          search: searchText,
          username: userData.username
        }
      });
      setfndlist(response.data.users);
      setFdlist(response.data.users);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    handleSelectChanged();
  }, [fndlist]);

  const handleSelectChanged = () => {
    console.log('Selected Option:', selectedOption);
    if (selectedOption == "Known") {
      setFdlist(fndlist.filter(fnd =>fnd.type == "Known"));
    } else if (selectedOption == "Bondhu") {
      setFdlist(fndlist.filter(fnd => fnd.type == "Bondhu"));
    } else {
      setFdlist(fndlist);
    }
  };
  const handleSelectChangedd = (option) => {
    console.log('Selected Option:', option);
    if (option == "Known") {
      setFdlist(fndlist.filter(fnd =>fnd.type == option));
    } else if (option == "Bondhu") {
      setFdlist(fndlist.filter(fnd => fnd.type == option));
    } else {
      setFdlist(fndlist);
    }
    console.log(fdlist);
  };
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    handleSelectChangedd(event.target.value);
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  return (
    <div className="fndlist">
      <h1>Your Friends</h1>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="searchInput"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="btn btn-success" type="submit">Search</button>
          </div>
        </div>
      </form>
      <div className="d-flex mt-2">
        <h5 className='m-2'>Sort By:</h5>
        <select className='m-2' onChange={handleSelectChange} value={selectedOption}>
          <option value="all">ALL</option>
          <option value="Bondhu">Bondhu</option>
          <option value="Known">Known</option>
        </select>
      </div>
      <div className="d-inline-flex p-4 flex-wrap">
        {fdlist.map((fnd, index) => (
          <FndVox
            key={index}
            fndlist={fndlist}
            setfndlist={setfndlist}
            fnd={fnd}
            fetchfnd={fetchfnd}
            handleSelectChangedd={handleSelectChangedd}
            setFdlist={setFdlist}
            fdlist={fdlist}
            selectedOption={selectedOption}
          />
        ))}
      </div>
    </div>
  );
}
export default Fndbox;