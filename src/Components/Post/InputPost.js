import React, { useState,useEffect } from 'react';
import "../Post/InputPost.css";
import Profile from "../../assets/profile.jpg";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
// import KeyboardVoiceRoundedIcon from '@mui/icons-material/KeyboardVoiceRounded';
// import { FaSmile } from "react-icons/fa";
import axios from 'axios';

const InputPost = ({fetchPosts}) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const formattedTime = currentDate.toLocaleTimeString('en-US', { hour12: false });

  const [post, setpost] = useState({
    username: userData.username,
    content: '', // State variable for content
    post_date: formattedDate,
    post_time: formattedTime,
    blog_img: ""
  });

  const [images, setImages] = useState(null); // State variable for images

  const handleChange = (e) => {
    const { name, value } = e.target;
    setpost({ ...post, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setpost({ ...post, blog_img: file });
    setImages(file);
    //console.log(post.file);
  };
  useEffect(() => {
    // Fetch posts when component mounts
    fetchPosts();
  }, []);

  
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(post).forEach(([key, value]) => {
        console.log(key, value);
        if(key === 'blog_img' && !(value instanceof File)) {
          console.log('No image provided.');  
          return; 
        }
        formData.append(key, value);  
      });
      console.log(formData);
      const response = await axios.post('http://localhost:8000/addblog', formData);
      console.log(response.data); 
      alert('Blog created successfully');
      // Reset form data
      setpost({
        username: userData.username,
        content: '',
        post_date: formattedDate,
        post_time: formattedTime,
        blog_img: null
      });
      fetchPosts();
      setImages(null); // Reset images state
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Error creating blog. Please try again.');
    }
  };

  return (
    <div className="i-form">
      <form onSubmit={onSubmit}>
        <div className="i-input-box">
          <img src={Profile} className='i-img'/>
          <input 
            type="text" 
            id="i-input" 
            placeholder={`What's in your mind ${userData.first_name}?`}
            required
            value={post.content} // Use formData.content instead of body
            onChange={handleChange} // Use handleChange for content change
            name="content" // Set name for content
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
            </div> */}

            {/* <div className="pv-upload">
              <KeyboardVoiceRoundedIcon className="input-svg" style={{fontSize:"38px",color:"green"}}/>
              <span className='photo-dis'>Audio</span>
            </div> */}

            {/* <div className="pv-upload">
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

export default InputPost;
