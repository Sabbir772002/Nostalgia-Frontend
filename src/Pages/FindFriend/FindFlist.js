import React from 'react'
import FindF from "../../Components/FindF/FindF";
import './FindFriend.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
const FindFlist = ({fndlist,setfndlist,fetchData}) => {
  const [searchText, setSearchText] = useState('');
  const [searchWithImages, setSearchWithImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const userData= JSON.parse(localStorage.getItem('userData'));
  const [fdlist,setfdlist] = useState([]);
const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Form data for the request
      const formData = new FormData();
      formData.append('search', searchText);
      formData.append('searchWithImages', searchWithImages);
      formData.append('username',userData.username);
      if (selectedImage) {
        formData.append('image', selectedImage);
      }
      console.log('Form Data:', userData.username);  
      // API endpoint
      const url = 'http://127.0.0.1:8000/searchfnd'
      const response = await axios.get(url, {
        params: {
          search: searchText,
         // searchWithImages: searchWithImages,
          username: userData.username
        }
      });
              //fetchData();
        setfndlist(response.data.users);
        setfdlist(response.data.users);
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
  useEffect(() => {
    handleSelectChanged();
  }, [fndlist]);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };


  const [selectedOption, setSelectedOption] = useState('');
const handleSelectChanged = () => {
    if(selectedOption=="requested"){
    setfdlist(fndlist.filter((fnd)=>fnd && fnd.good==userData.username));
    }else if(selectedOption=="request"){
      setfdlist(fndlist.filter((fnd)=>fnd.abedon==0 && fnd.status==1));
  }else{
    setfdlist(fndlist);
  }
};

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    if(event.target.value=="requested"){
    setfdlist(fndlist.filter((fnd)=>fnd && fnd.good==userData.username));
    }else if(event.target.value=="request"){
      setfdlist(fndlist.filter((fnd)=>fnd.abedon==0 && fnd.status==1));
  }else{
    setfdlist(fndlist);
  }
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
      {/* <div className="form-group">
        <div className="form-check">
          <input type="checkbox" className="mt-2 form-check-input" id="searchWithImages" checked={searchWithImages} onChange={() => setSearchWithImages(!searchWithImages)} />
          <label className="mt-2 form-check-label" htmlFor="searchWithImages">Search with Images? </label>
          <input type="file" className="form-control-file" id="imageUpload" onChange={handleImageChange} />
      </div>
      </div> */}
    </form>
    <div className="d-flex mt-2">
      <h5 className='m-2'> Sort By:</h5>
      <select className='m-2' onChange={handleSelectChange} value={selectedOption}>
      <option value="all">ALL</option>
        <option value="requested">Requested</option>
        <option value="request">Friend Request</option>
      </select>
    </div>

    {fdlist.length === 0 && <h1 className="mt-2 text-dark">No People Found</h1>}
    {fdlist.length>0 &&
    <div>
    <h1 className="mt-2 text-dark" rounded> People Matches You....</h1>
        {fdlist.length>0 && fdlist.map((fnd)=>(
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
}
    </div>   
  )
}

export default FindFlist;