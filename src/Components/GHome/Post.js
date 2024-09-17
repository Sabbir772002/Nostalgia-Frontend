import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import "../GHome/Post.css";
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
import api from '../../util/api';

const Post = ({ post, posts }) => {
  const [comments, setComments] = useState([]);
  const [like, setLike] = useState(post.is_upvoted);
  const [filledLike, setFilledLike] = useState(post.is_upvoted ? <FavoriteRoundedIcon /> : <FavoriteBorderOutlinedIcon />);
  const [commentInput, setCommentInput] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [socialIcons, setSocialIcons] = useState(false);
  const userdata = JSON.parse(localStorage.getItem('userData'));
  const [postbox,setPostbox] = useState(post);
  useEffect(() => {
    fetchComments(postbox.id);
  }, [post.id]);
  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`API_ENDPOINT/posts/${postId}/comments`);
      setComments(response.data.comments);
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
      const response = await axios.post(`${api.url}:8000/upvote`, { ...upvotedata });
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

  const handleCommentInput = async (e) => {
    e.preventDefault();
    const commentObj = {
      profilePic: Profile,
      username: "Vijay",
      comment: commentInput,
      time: moment().fromNow(),
    };
    try {
      const response = await axios.post(`API_ENDPOINT/posts/${postbox.id}/comments`, commentObj);
      setComments([...comments, response.data.comment]);
      setCommentInput("");
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  const handleFriendsId = (id) => {
    // Implement this function as per your requirements
  };

  return (
    <div className='post'>
      <div className='post-header'>
        <Link to={`/profile/${post.author}`} style={{ textDecoration: "none" }}>

          <div className='post-user' onClick={() => handleFriendsId(postbox.id)} style={{ cursor: "pointer" }}>

            <img src={`${api.url}:8000/${postbox.author_img}`} className='p-img' alt="" />
                <div className='post-user-info item-align-center'>
                <Link to={`/group/${post.group_username}`}>
                <h2 className='' style={{ marginBottom: '5px' }}>{post.group_name}</h2>
                </Link>
                <h4 className='ml-2 item-align-center text-align-center' style={{ color: 'gray', fontSize: '14px', marginLeft: '5px', marginTop: '0' }}>{postbox.author}</h4>
                {/* <h5 className='ml-2 datePara'>{postbox.post_date}</h5> */}
                </div>
                </div>
        </Link>

        <div className='delete'>
        <h4 className='ml-2' style={{fontSize: '10px'}}>Posted on: {postbox.post_date}</h4>
         {/* {showDelete && (<div className="options">
            <button><PiSmileySad />Not Interested in this post</button>
            <button><IoVolumeMuteOutline />Mute this user</button>
            <button><MdBlockFlipped />Block this user</button>
            <button onClick={()=>handleDelete(post.id)}><AiOutlineDelete />Delete</button>
            <button><MdReportGmailerrorred />Report post</button>
         </div>
         )} */}
          {/* <MoreVertRoundedIcon className='post-vertical-icon' onClick={()=>setShowDelete(!showDelete)}/> */}
         </div>
       </div>

      <p className='body'>{
        (postbox.content).length <= 300 ?
        postbox.content : `${(postbox.content).slice(0, 300)}...`
      }</p>

      {postbox.post_img && (<img src={`${api.url}:8000/${postbox.post_img}`} alt="" className="post-img" />)}

      <div className="post-foot">
        <div className="post-footer">
          <div className="like-icons">
            {/* <p className='heart' onClick={handleLike}>
              {filledLike}
            </p> */}

            {/* <MessageRoundedIcon onClick={() => setShowComment(!showComment)} className='msg' /> */}

            {/* <ShareOutlinedIcon onClick={() => setSocialIcons(!socialIcons)} className='share' /> */}

            {socialIcons && (
              <div className="social-buttons">
                {/* Add social media icons here */}
              </div>
            )}
          </div>

          {/* <div className="like-comment-details">
            <span className='post-like'>{postbox.upvote} people Upvoted it,</span>
            <span className='post-comment'>{comments.length} comments</span>
          </div> */}

          {/* {showComment && (
            <div className="commentSection">
              <form onSubmit={handleCommentInput}>
                <div className="cmtGroup">
                  <SentimentSatisfiedRoundedIcon className='emoji' />
                  <input
                    type="text"
                    id="commentInput"
                    required
                    placeholder='Add a comment...'
                    onChange={(e) => setCommentInput(e.target.value)}
                    value={commentInput}
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
                  />
                ))}
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Post;
