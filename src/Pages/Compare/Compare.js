import React, { useState } from 'react';
import axios from 'axios';

const FaceCompareForm = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [result, setResult] = useState('');

  const handleImage1Change = (event) => {
    setImage1(event.target.files[0]);
  };

  const handleImage2Change = (event) => {
    setImage2(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', image1);
    formData.append('image2', image2);

    try {
      const response = await axios.post('http://your-api-endpoint/compare_images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Face Comparison</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image1">Image 1:</label>
          <input type="file" id="image1" accept="image/*" onChange={handleImage1Change} />
        </div>
        <div>
          <label htmlFor="image2">Image 2:</label>
          <input type="file" id="image2" accept="image/*" onChange={handleImage2Change} />
        </div>
        <button type="submit">Compare Images</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
};

export default FaceCompareForm;

