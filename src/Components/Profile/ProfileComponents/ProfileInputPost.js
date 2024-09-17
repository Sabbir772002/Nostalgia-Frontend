import React, { useState, useEffect } from 'react';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import axios from 'axios';
import api from '../../../util/api';
import '../../../Components/Post/InputPost.css';
const ProfileInputPost = (fetchPosts) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const formattedTime = currentDate.toLocaleTimeString('en-US', { hour12: false });

  const [post, setPost] = useState({
    username: userData.username,
    content: '',
    post_date: formattedDate,
    post_time: formattedTime,
    blog_img: ""
  });
  const [images, setImages] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPost({ ...post, blog_img: file });
    setImages(file);
  };



  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(post).forEach(([key, value]) => {
        if (key === 'blog_img' && !(value instanceof File)) {
          return;
        }
        formData.append(key, value);
      });

      const response = await axios.post(`${api.url}:8000/addblog`, formData);
      alert('Blog created successfully');
      // fetchPosts();
      setPost({
        username: userData.username,
        content: '',
        post_date: formattedDate,
        post_time: formattedTime,
        blog_img: null
      });
      setImages(null);
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Error creating blog. Please try again.');
    }
  };

  return (
    <div className="i-form">
      <form onSubmit={onSubmit}>
        <div className="i-input-box">
          <img src={`${api.url}:8000/${userData.p_image}`} className='i-img' alt="Profile" />
          <input
            type="text"
            id="i-input"
            placeholder={`What's on your mind, ${userData.first_name}?`}
            required
            value={post.content}
            onChange={handleChange}
            name="content"
          />
        </div>

        <div className="file-upload">
          <div className="file-icons">
            <label htmlFor="file" className="pv-upload">
              <PhotoLibraryIcon className="input-svg" style={{ fontSize: "38px", color: "orangered" }} />
              <span className='photo-dis'>Photo</span>
            </label>
          </div>
          <button type='submit'>Share</button>
        </div>

        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {images && (
          <div className="displayImg">
            <CloseRoundedIcon onClick={() => setImages(null)} />
            <img src={URL.createObjectURL(images)} alt="Selected" />
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileInputPost;
