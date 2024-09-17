import React, { useState } from 'react';
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
import axios from 'axios';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';
import api from '../../util/api';
import Comments from '../Comments/Comments';
import './Posts.css'
const PostUser = ({ posts, post, setPosts, userData }) => {
  const [comments, setComments] = useState([]);
  const [like, setLike] = useState(post.like);
  const [unlike, setUnlike] = useState(false);

  const [filledLike, setFilledLike] = useState(<FavoriteBorderOutlinedIcon />);
  const [unFilledLike, setUnFilledLike] = useState(false);
  const handleLikes = () => {
    setLike(unlike ? like - 1 : like + 1);
    setUnlike(!unlike);

    setFilledLike(unFilledLike ? <FavoriteBorderOutlinedIcon /> : <FavoriteRoundedIcon />);
    setUnFilledLike(!unFilledLike);
  };

  const [showDelete, setShowDelete] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const [commentInput, setCommentInput] = useState("");
  const handleCommentInput = (e) => {
    e.preventDefault();

    const id = comments && comments.length ? comments[comments.length - 1].id + 1 : 1;
    const profilePic = userData.pp;
    const username = userData.pp;
    const comment = commentInput;
    const time = moment.utc(new Date(), 'yyyy/MM/dd kk:mm:ss').local().startOf('seconds').fromNow();
    const commentObj = {
      id: id,
      profilePic: profilePic,
      likes: 0,
      username: username,
      comment: comment,
      time: time
    };
    const insert = [...comments, commentObj];
    setComments(insert);
    setCommentInput("");
  };
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const handleDelete= async (id) => {
    setShowDelete(false);
    try {
      const postdel = posts.find(p => p.id == id);
      const box={id:id};
      console.log(box);
      const response = await axios.post(`${api.url}:8000/posts`,{
        id:id
      });
      const updatedPosts = posts.filter(p => p.id !== id);
      setPosts(updatedPosts); 
      // const deleteFilter = posts.filter(val => val.id !== id);
      // setPosts(deleteFilter);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  
  const handleEdit = () => {
    setShowDelete(!showDelete);
    setEditedContent(post.content);
    setEditModalOpen(true);
  };
  
  const handleUpdate = async () => {
    setEditModalOpen(false);
    try {
      console.log('Post:', post);
      const updatedPost = { ...post, content: editedContent };
      const response = await axios.put(`${api.url}:8000/posts`, updatedPost);
      // Update the posts state with the updated post
      const updatedPosts = posts.map(p => p.id === post.id ? updatedPost : p);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const [socialIcons, setSocialIcons] = useState(false);
  const userdata = JSON.parse(localStorage.getItem('userData'));

  return (
    <div className='post'>
      <div className='post-header'>
        <div className='post-user' style={{ cursor: "pointer" }}>
          <img src={`${api.url}:8000${post.author_img}`} className='p-img' alt="" />
          <h2>{userData.username}</h2>
          <p className='datePara'>{post.post_date}</p>
        </div>

        <div className='delete'>
          {showDelete && (
            <div className="options">
              {post.author === userdata.username && (
                <>
                  <button onClick={() => handleDelete(post.id)}><AiOutlineDelete />Delete</button>
                  <button onClick={() => handleEdit(post.id)}><AiOutlineDelete />Edit Post</button>
                </>
              )}
              <button><MdReportGmailerrorred />Report post</button>
            </div>
          )}
          <MoreVertRoundedIcon className='post-vertical-icon' onClick={() => setShowDelete(!showDelete)} />
        </div>
      </div>

      <p className='body'>{
        (post.content).length <= 300 ?
          post.content : `${(post.content).slice(0, 300)}...`
      }</p>

      {post.blog_img && (<img src={`${api.url}:8000/${post.blog_img}`} alt="" className="post-img" />)}

      <div className="post-foot">
        <div className="post-footer">
          <div className="like-icons">
            <p className='heart'
              onClick={handleLikes}
              style={{ marginTop: "5px" }}
            >
              {filledLike}
            </p>

            <MessageRoundedIcon
              onClick={() => setShowComment(!showComment)}
              className='msg'
            />

            {/* <ShareOutlinedIcon 
              onClick={() => setSocialIcons(!socialIcons)}
              className='share'
            /> */}

            {socialIcons && (
              <div className="social-buttons">
                <a href="http://www.facebook.com" target="blank" className="social-margin">
                  <div className="social-icon facebook">
                    <LiaFacebookF className='social-links' />
                  </div>
                </a>

                <a href="https://pinterest.com/" target="blank" className="social-margin">
                  <div className="social-icon instagram">
                    <FiInstagram className='social-links' />
                  </div>
                </a>

                <a href="http://linkedin.com/" className="social-margin" target="blank">
                  <div className="social-icon linkedin">
                    <BiLogoLinkedin className='social-links' />
                  </div>
                </a>

                <a href="https://github.com/" target="blank" className="social-margin">
                  <div className="social-icon github">
                    <FiGithub className='social-links' />
                  </div>
                </a>

                <a href="http://youtube.com/" target="blank" className="social-margin">
                  <div className="social-icon youtube">
                    <AiFillYoutube className='social-links' />
                  </div>
                </a>

                <a href="http://twitter.com/" target="blank" className="social-margin">
                  <div className="social-icon twitter">
                    <RxTwitterLogo />
                  </div>
                </a>
              </div>
            )}
          </div>

          <div className="like-comment-details">
            <span className='post-like'>{like} people like it,</span>
            <span className='post-comment'>{comments.length} comments</span>
          </div>

          {showComment && (<div className="commentSection">
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
                  userD={userData.pp}
                  className="classComment"
                  cmt={cmt}
                  key={cmt.id}
                />
              ))}
            </div>
          </div>)}
        </div>
      </div>
      {/* Edit Modal */}
      <Modal show={editModalOpen} onHide={() => setEditModalOpen(false)} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className='form-control'
            rows='6'
            cols='100'
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModalOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PostUser;