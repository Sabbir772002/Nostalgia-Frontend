import React, { useState, useEffect } from 'react';
import "../../Post/InputPost.css";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import axios from 'axios';
import api from '../../../util/api';

const ProfileInputPost = ({fetchPosts,fmembers,group}) => {
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const formattedTime = currentDate.toLocaleTimeString('en-US', { hour12: false });
  const [post, setpost] = useState({
    username: userData.username,
    content: '',
    post_date: formattedDate,
    post_time: formattedTime,
    blog_img: "",
    gp: group.username
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

  useEffect(() => {
    if (fmembers) fmembers();
  }, [fmembers]);

  const onSubmit = async (e) => {
    e.preventDefault();
    let i = 0;
    try {
      const formData = new FormData();
      Object.entries(post).forEach(([key, value]) => {
        if (key === 'blog_img' && !(value instanceof File)) {
          return; 
        }
        formData.append(key, value);  
      });

      await axios.post(`${api.url}:8001/addgroupost`, formData);
      alert('Group Post created successfully');
      i = 1;
      setpost({
        username: userData.username,
        content: '',
        post_date: formattedDate,
        post_time: formattedTime,
        blog_img: null,
        gp: group.username
      });
      if (fetchPosts) fetchPosts();
      setImages(null);
    } catch (error) {
      console.error('Error creating blog:', error);
      if (i === 0) alert('Error creating blog. Please try again.');
    }
  };

  return (
    <div className="i-form">
      <form onSubmit={onSubmit}>
        <div className="i-input-box">
          <img src={`${api.url}:8001/${userData.p_image}`} className='i-img' alt="avatar" />
          <input 
            type="text" 
            id="i-input" 
            placeholder="What's on your mind?"
            required
            value={post.content}
            onChange={handleChange}
            name="content"
          />
        </div>

        <div className="file-upload">
          <div className="file-icons">
            <label htmlFor="file" className="pv-upload">
              <PhotoLibraryIcon className="input-svg" style={{fontSize:"38px",color:"orangered"}}/>
              <span className='photo-dis'>Photo</span>
            </label>
            {/* <div className="pv-upload">
              <PlayCircleFilledOutlinedIcon className="input-svg" style={{fontSize:"38px",color:"black"}}/>
              <span className='photo-dis'>Video</span>
            </div>

            <div className="pv-upload">
              <KeyboardVoiceRoundedIcon className="input-svg" style={{fontSize:"38px",color:"green"}}/>
              <span className='photo-dis'>Audio</span>
            </div>

            <div className="pv-upload">
              <FaSmile className="input-svg" style={{fontSize:"30px",color:"red"}}/>
              <span className='photo-dis'>Feelings/Activity</span>
            </div> */}
          </div>
          <button type='submit'>Share</button>

        </div>


        <div style={{display:"none"}} >
          <input 
            type="file" 
            id="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {images && (
          <div className="displayImg">
            <CloseRoundedIcon onClick={()=>setImages(null)}/>
            <img src={URL.createObjectURL(images)} alt="" />
          </div>
        )}

      </form>
    </div>
  );
};

export default ProfileInputPost;
