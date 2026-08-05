import React, { useState, useEffect } from 'react';
import "../Post/InputPost.css";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import axios from 'axios';
import ServerUrl, { getImageUrl } from '../../api/serverUrl';
import ProfileDefaultImg from "../../assets/profile.jpg";

const InputPost = ({ fetchPosts }) => {
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const token = localStorage.getItem('token');
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const formattedTime = currentDate.toLocaleTimeString('en-US', { hour12: false });

  const [post, setpost] = useState({
    username: userData.username,
    content: '',
    post_date: formattedDate,
    post_time: formattedTime,
    blog_img: ""
  });
  const [images, setImages] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setpost({ ...post, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setpost({ ...post, blog_img: file });
    setImages(file);
  };

  // fetchPosts is called in onSubmit after successful post creation

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(post).forEach(([key, value]) => {
        if (key === 'blog_img' && !(value instanceof File)) {
          return; 
        }
        formData.append(key, value);  
        formData.append('token', token);
      });

      await axios.post(`${ServerUrl.BASE_URL}addblog`, formData);
      alert('Blog created successfully');
      setpost({
        username: userData.username,
        content: '',
        post_date: formattedDate,
        post_time: formattedTime,
        blog_img: null
      });
      if (fetchPosts) fetchPosts();
      setImages(null);
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Error creating blog. Please try again.');
    }
  };

  const avatarSrc = getImageUrl(userData.p_image || userData.pp);

  return (
    <div className="i-form">
      <form onSubmit={onSubmit}>
        <div className="i-input-box">
          <img
            src={avatarSrc}
            className='i-img'
            alt="avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = ProfileDefaultImg;
            }}
          />
          <input 
            type="text" 
            id="i-input" 
            placeholder={`What's in your mind ${userData.first_name || userData.username}?`}
            required
            value={post.content}
            onChange={handleChange}
            name="content"
          />
        </div>

        <div className="file-upload">
          <div className="file-icons">
            <label htmlFor="file" className="pv-upload">
              <PhotoLibraryIcon className="input-svg" style={{ fontSize: "38px", color: "orangered" }}/>
              <span className='photo-dis'>Photo</span>
            </label>
          </div>
          <button type='submit'>Share</button>
        </div>

        <div style={{ display: "none" }}>
          <input 
            type="file" 
            id="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {images && (
          <div className="displayImg">
            <CloseRoundedIcon onClick={() => setImages(null)}/>
            <img src={URL.createObjectURL(images)} alt="" />
          </div>
        )}
      </form>
    </div>
  );
};

export default InputPost;
