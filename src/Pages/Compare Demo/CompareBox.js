import React, { useState } from 'react';
import axios from 'axios';

const CompareBox = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [compareResult, setCompareResult] = useState('');
  const [leftImage, setLeftImage] = useState(null);
  const [rightImage, setRightImage] = useState(null);



  const handleImage1Upload = (e) => {
    setImage1(e.target.files[0]);
    setLeftImage(URL.createObjectURL(e.target.files[0]));

  };

  const handleImage2Upload = (e) => {
    setImage2(e.target.files[0]);
    setRightImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = async () => {
    if (!image1 || !image2) {
      console.error('Please select both images');
      return;
    }

    const formData = new FormData();
    formData.append('image1', image1);
    formData.append('image2', image2);

    try {
      const response = await axios.post('http://127.0.0.1:8000/compare', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Upload success:', response.data);
      setCompareResult(response.data.result);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error('Error uploading images:', error);
      // Handle error (e.g., show an error message)
    }
  };
  return (
    <div className='info'>
      <h1 className="text-center mt-5 mb-4">Compare Page</h1>
      <div className="row mb-4 m-4">
        <div className="col-md-6 text-center" style={{ borderRight: '1px solid black' }}>
          <input type="file" accept="image/*" onChange={handleImage1Upload} />
          {leftImage && <img src={leftImage} alt="Left Image" className="img-fluid mt-3" style={{minHeight:'400px', maxHeight:'400px', maxWidth: '100%', height: 'auto' }} />}

        </div>
        <div className="col-md-6 text-center" style={{ borderLeft: '1px solid black' }}>
          <input type="file" accept="image/*" onChange={handleImage2Upload} />
          {rightImage && <img src={rightImage} alt="Right Image" className="img-fluid mt-3" style={{minHeight:'400px', maxHeight:'400px', maxWidth: '100%', height: 'auto' }} />}
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
              <h3>Comparison Result</h3>
              <p>{compareResult}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareBox;
