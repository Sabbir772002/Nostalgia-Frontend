import React from 'react'
import FindF from "../../Components/FindF/FindF";
import './FindFriend.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
const FindFlist = ({fndlist,setfndlist,fetchData}) => {
  const [searchText, setSearchText] = useState('');
  const [searchWithImages, setSearchWithImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

const handleSearch = async (e) => {
    e.preventDefault();

    try {
      // Form data for the request
      const formData = new FormData();
      formData.append('searchText', searchText);
      formData.append('searchWithImages', searchWithImages);
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      // API endpoint
      const url = 'https://example.com/search';

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
        fetchData();

      // Handle response data
      console.log('Response:', response.data);
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
    console.log('Search Text:', searchText);
    console.log('Search with Images:', searchWithImages);
    console.log('Selected Image:', selectedImage);
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };



  return (
<div className='fndlist'>
  <h1>Find Friends</h1>
  <form onSubmit={handleSearch}>
      <div className="form-group">
        <div className="input-group">
          <input type="text" className="form-control" id="searchInput" placeholder="Search..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <button className="btn btn-success" type="submit">Search</button>
        </div>
      </div>
      <div className="form-group">
        <div className="form-check">
          <input type="checkbox" className="mt-2 form-check-input" id="searchWithImages" checked={searchWithImages} onChange={() => setSearchWithImages(!searchWithImages)} />
          <label className="mt-2 form-check-label" htmlFor="searchWithImages">Search with Images? </label>
          <input type="file" className="form-control-file" id="imageUpload" onChange={handleImageChange} />
      </div>
      </div>
    </form>



    <h1 className="text-dark" rounded> People Matches You....</h1>

        {fndlist.map((fnd)=>(
             <div className="d-inline-flex p-4">

            <FindF 
            fndlist={fndlist}
            setfndlist={setfndlist}
            fnd ={fnd}
            fetchData={fetchData}
            />
            </div>
        ))}
    </div>   
  )
}

export default FindFlist;