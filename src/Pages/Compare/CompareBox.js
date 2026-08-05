import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../../util/api';

const CompareBox = ({userData}) => {
  const [image1, setImage1] = useState(null);
  const [compareResult, setCompareResult] = useState('');
  const [leftImage, setLeftImage] = useState(null);
  const [process, setProcess] = useState(false);

  const handleImage1Upload = (e) => {
    setImage1(e.target.files[0]);
    setLeftImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = async () => {
    setProcess(true); 
    if (!image1 || !userData.pp) {
      console.error('Please select both images');
      setProcess(false);
      return;
    }
    const formData = new FormData();
    formData.append('image1', image1);
    formData.append('image2', userData.pp);

    try {
      const response = await axios.post(`${api.url}:8001/compare`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProcess(false);
      setCompareResult(response.data.result);
    } catch (error) {
      setProcess(false);
      console.error('Error uploading images:', error);
    }
  };

  return (
    <div className='info'>
      <h1 className="text-center mt-5 mb-4">Compare Page</h1>
      <div className="row mb-4 m-4">
        <div className="col-md-6 text-center" style={{ borderRight: '1px solid black' }}>
          <input type="file" accept="image/*" onChange={handleImage1Upload} />
          {leftImage && <img src={leftImage} alt="Left preview target" className="img-fluid mt-3" style={{minHeight:'400px', maxHeight:'400px', maxWidth: '100%', height: 'auto' }} />}
        </div>
        <div className="col-md-6 text-center" style={{ borderLeft: '1px solid black' }}>
          <h5> Profile Image of:  <Link to={`/profile/${userData.username}`}>{userData.first_name} {userData.last_name}</Link></h5>
          <img src={`${api.url}:8001/${userData.pp}`} alt="Right profile target" className="img-fluid mt-3" style={{minHeight:'400px', maxHeight:'400px', maxWidth: '100%', height: 'auto' }} />
        </div>
      </div>
      <div className="row justify-content-center mb-4">
        <div className="col-md-7 text-center">
          <button className="btn btn-primary" onClick={handleUpload}>
            Compare
          </button>
        </div>
      </div>
      {compareResult && (
        <div className="row justify-content-center items-align-center text-center">
          <div className="col-md-8">
            <div className="result-box">
              <h3>Two People face are {compareResult}% simillar.</h3>
              {/* <p>{compareResult}</p> */}
            </div>
          </div>
        </div>
      )}
    {process && (
        <div className="modal text-center bg-transparent fade-in" style={{ left: '42%', width: '200px' }}>
          <div className="modal-content">
            <div className="processing-circle"></div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CompareBox;
