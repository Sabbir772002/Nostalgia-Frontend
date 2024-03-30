import React, { useState } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const handleImage1Upload = (e) => {
    setImage1(e.target.files[0]);
  };

  const handleImage2Upload = (e) => {
    setImage2(e.target.files[0]);
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
      const response = await axios.post('http://127.0.0.1:8000/upload_images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Upload success:', response.data);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error('Error uploading images:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className='interface'>
      {/* Your other components and content here */}
      <div>
        <h2>Upload Images</h2>
        <div>
          <label htmlFor="image1">Image 1:</label>
          <input type="file" id="image1" accept="image/*" onChange={handleImage1Upload} />
        </div>
        <div>
          <label htmlFor="image2">Image 2:</label>
          <input type="file" id="image2" accept="image/*" onChange={handleImage2Upload} />
        </div>
        <button onClick={handleUpload}>Upload</button>
      </div>
      {/* More content */}
    </div>
  );
};

export default EditProfile;
