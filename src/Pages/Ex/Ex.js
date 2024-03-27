import React, { useState } from 'react';

const ComparePage = () => {
  const [leftImage, setLeftImage] = useState(null);
  const [rightImage, setRightImage] = useState(null);

  const handleLeftImageUpload = (e) => {
    setLeftImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleRightImageUpload = (e) => {
    setRightImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleCompare = () => {
    // Your compare logic here
    console.log('Comparing images...');
  };

  return (
        <div className='info'>
        <h1 className="text-center mt-5 mb-4" style={{ height: '100%', width: '100%' }}>Compare Page</h1>
      <div className="row mb-4 m-4">
        <div className="col-md-6 text-center " style={{ borderRight: '1px solid black'}}>
          <input type="file" accept="image/*" onChange={handleLeftImageUpload} />
          {leftImage && <img src={leftImage} alt="Left Image" className="img-fluid mt-3" style={{ maxWidth: '100%', height: 'auto' }} />}
      </div>
      {/* <h1 className="col-md-2 text-center" style={{ borderRight: '1px solid black', borderLeft: '1px solid black' }}/> */}

        <div className="col-md-6  text-center " style={{ borderLeft: '1px solid black' }}>
          <input type="file" accept="image/*" onChange={handleRightImageUpload} />
          {rightImage && <img src={rightImage} alt="Right Image" className="img-fluid mt-3" style={{ maxWidth: '100%', height: 'auto' }} />}
        </div>
      </div>
      <div className="row justify-content-center mb-4">
        <div className="col-md-7 text-center">
          <button className="btn btn-primary" onClick={handleCompare}>Compare</button>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="text-center">
          <h3>Image Info</h3>
          <p>Additional information about the compared images.</p>
        </div>
      </div>
    </div>
  );








};

export default ComparePage;
