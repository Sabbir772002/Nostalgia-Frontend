import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import "../Home/Post.css";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import { PiSmileySad } from "react-icons/pi";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { MdReportGmailerrorred } from "react-icons/md";
import { LiaFacebookF } from "react-icons/lia";
import { FiInstagram } from "react-icons/fi";
import { BiLogoLinkedin } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import { RxTwitterLogo } from "react-icons/rx";
import { FiGithub } from "react-icons/fi";
import img1 from "../../assets/Following/img-2.jpg";
import img2 from  "../../assets/Following/img-3.jpg";
import img3 from  "../../assets/Following/img-4.jpg";
import Profile from "../../assets/profile.jpg";
import Comments from '../Comments/Comments';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Post = ({ post, posts }) => {
    const [postbox,setPostbox] = useState(post);

  const [comments,setComments] =useState([]);
  const [like, setLike] = useState(post.is_upvoted);
  const [filledLike, setFilledLike] = useState(post.is_upvoted ? <FavoriteRoundedIcon /> : <FavoriteBorderOutlinedIcon />);
  const [showDelete, setShowDelete] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [socialIcons, setSocialIcons] = useState(false);
  const userdata = JSON.parse(localStorage.getItem('userData'));
  const [commentInput, setCommentInput] = useState({
    author: userdata.username,
    content: '',
    blog: post.id,
});
const handleCommentSubmit = async (e) => {
    console.log(commentInput.content);
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8000/comment', commentInput);
        console.log(response.data);
        alert('Comment created successfully');
        setCommentInput(  { 
         author: userdata.username,
          content: '',
          blog: post.id,
    });
        //Fetch comments again
        fetchComments();
    } catch (error) {
        console.error('Error creating comment:', error);
        alert('Error creating comment. Please try again.');
    }
};
  useEffect(() => {
    fetchComments(postbox.id);
  }, []);
  const fetchComments = async (postId) => {
    try {
      console.log(post.author);
      console.log(post.id);
      
      const response = await axios.get(`http://localhost:8000/comments`,{
          params: {
          username:post.author,
          blog: post.id
      }
      });
      console.log(response.data);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleLike = async () => {
    try {
      const upvotedata = {
        username: userdata.username,
        id: postbox.id,
        time: moment().fromNow(),
      };
      const response = await axios.post(`http://localhost:8000/upvote`, { ...upvotedata });
      setLike(response.data.is_upvoted);
      setFilledLike(response.data.is_upvoted ? <FavoriteRoundedIcon /> : <FavoriteBorderOutlinedIcon />);
      //console.log(response.data);
      setPostbox(response.data);
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`API_ENDPOINT/posts/${id}`);
      // Handle UI update after successful deletion
    } catch (error) {
      console.error('Error deleting the post:', error);
    
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentInput(prevState => ({ ...prevState, [name]: value }));
};
  const handleFriendsId = (id) => {
    // Implement this function as per your requirements
  };
  
  return (
    <div className='post'>
      <div className='post-header'>
        <Link to={`/profile/${post.author}`} style={{ textDecoration: "none" }}>
          <div className='post-user' onClick={() => handleFriendsId(postbox.id)} style={{ cursor: "pointer" }}>
            <img src={`http://localhost:8000/${postbox.author_img}`} className='p-img' alt="" />
            <div className='post-user-info'>
              <h2>{postbox.author}</h2>
              <p className='datePara'>{postbox.post_date}</p>
            </div>
          </div>
        </Link>

        <div className='delete'>
         {showDelete && (<div className="options">
            {/* <button><PiSmileySad />Not Interested in this post</button> */}
            {/* <button><IoVolumeMuteOutline />Mute this user</button> */}
            {/* <button><MdBlockFlipped />Block this user</button> */}
            <button onClick={()=>handleDelete(post.id)}><AiOutlineDelete />Delete</button>
            <button><MdReportGmailerrorred />Report post</button>
         </div>
         )}
          <MoreVertRoundedIcon className='post-vertical-icon' onClick={()=>setShowDelete(!showDelete)}/>
         </div>
       </div>

      <p className='body'>{
        (postbox.content).length <= 300 ?
        postbox.content : `${(postbox.content).slice(0, 300)}...`
      }</p>

      {postbox.blog_img && (<img src={`http://localhost:8000/${postbox.blog_img}`} alt="" className="post-img" />)}

      <div className="post-foot">
        <div className="post-footer">
          <div className="like-icons">
            <p className='heart' onClick={handleLike}>
              {filledLike}
            </p>

            <MessageRoundedIcon onClick={() => setShowComment(!showComment)} className='msg' />

            {/* <ShareOutlinedIcon onClick={() => setSocialIcons(!socialIcons)} className='share' /> */}

            {socialIcons && (
              <div className="social-buttons">
                {/* Add social media icons here */}
              </div>
            )}
          </div>
          <div className="like-comment-details">
            <span className='post-like'>{postbox.upvote}  Upvote</span>
            <span className='post-comment'>{comments.length} comments</span>
          </div>

          {showComment && (
            <div className="commentSection">
              <form onSubmit={handleCommentSubmit}>
                <div className="cmtGroup">
                  <SentimentSatisfiedRoundedIcon className='emoji' />
                  <input
                    type="text"
                    id="commentInput"
                    required
                    placeholder='Add a comment...'
                    onChange={handleChange}
                    value={commentInput.content}
                    name="content"
                  />
                  <button type='submit'><SendRoundedIcon className='send' /></button>
                </div>
              </form>

              <div className="sticky">
                {comments.map((cmt) => (
                  <Comments
                    className="classComment"
                    cmt={cmt}
                    key={cmt.id}
                    cmnt={comments}
                    post={post}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
