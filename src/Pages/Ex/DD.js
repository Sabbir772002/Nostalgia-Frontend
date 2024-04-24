import React, { useState, useRef } from 'react';

const DD = () => {
  const [photoData, setPhotoData] = useState(null);
  const videoRef = useRef();
  const canvasRef = useRef();

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(error => console.error('Error accessing camera:', error));
  };

  const takePhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 600, 400); // Adjusted dimensions
    const dataUrl = canvasRef.current.toDataURL('image/png');
    setPhotoData(dataUrl);
  };

  return (
    <div>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={takePhoto}>Take Photo</button>
      {photoData && <img src={photoData} alt="Captured" />}
      <video ref={videoRef} width="600" height="400" autoPlay muted></video>
      <canvas ref={canvasRef} style={{ display: 'none' }} width="600" height="400"></canvas>
    </div>
  );
};

export default DD;
