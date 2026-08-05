import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Home/Post.css";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';

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
import ServerUrl, { getImageUrl } from '../../api/serverUrl';
import SinglePostModal from '../Post/SinglePostModal';
import Comments from '../Comments/Comments';
import './Posts.css';

const PostUser = ({ posts, post, setPosts, userData }) => {
  const [comments, setComments] = useState([]);
  const [like, setLike] = useState(post.like || post.upvote || 0);
  const [unlike, setUnlike] = useState(false);
  const [singleModalOpen, setSingleModalOpen] = useState(false);

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
    const username = userData.username;
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

  const handleDelete = async (id) => {
    setShowDelete(false);
    try {
      await axios.post(`${ServerUrl.BASE_URL}posts`, {
        id: id
      });
      const updatedPosts = posts.filter(p => p.id !== id);
      setPosts(updatedPosts); 
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
      const updatedPost = { ...post, content: editedContent };
      await axios.put(`${ServerUrl.BASE_URL}posts`, updatedPost);
      const updatedPosts = posts.map(p => p.id === post.id ? updatedPost : p);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const socialIcons = false;
  const userdata = JSON.parse(localStorage.getItem('userData')) || {};
  const activeUser = userdata.username || userData.username;

  return (
    <>
      <div className='post'>
        <div className='post-header'>
          <div className='post-user' style={{ cursor: "pointer" }}>
            <img src={getImageUrl(post.author_img || userData.pp)} className='p-img' alt="" />
            <h2>{userData.username || post.author}</h2>
            <Link to={`/blog/${post.blogid || post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <p className='datePara' style={{ cursor: "pointer" }}>{post.post_date}</p>
            </Link>
          </div>

          <div className='delete'>
            {showDelete && (
              <div className="options">
                {post.author === activeUser && (
                  <>
                    <button onClick={() => handleDelete(post.id || post.blogid)}><AiOutlineDelete />Delete</button>
                    <button onClick={() => handleEdit(post.id || post.blogid)}><AiOutlineDelete />Edit Post</button>
                  </>
                )}
                <button><MdReportGmailerrorred />Report post</button>
              </div>
            )}
            <MoreVertRoundedIcon className='post-vertical-icon' onClick={() => setShowDelete(!showDelete)} />
          </div>
        </div>

        <p className='body' onClick={() => setSingleModalOpen(true)} style={{ cursor: 'pointer' }}>
          {post.content && typeof post.content === 'string' && post.content.length > 300 ? (
            `${post.content.slice(0, 300)}... (Click for detail)`
          ) : (
            post.content
          )}
        </p>

        {post.blog_img && (
          <img
            src={getImageUrl(post.blog_img)}
            alt=""
            className="post-img"
            onClick={() => setSingleModalOpen(true)}
            style={{ cursor: 'pointer' }}
          />
        )}

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
                onClick={() => setSingleModalOpen(true)}
                className='msg'
                style={{ cursor: 'pointer' }}
              />
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

      <SinglePostModal
        blogId={post.blogid || post.id}
        isOpen={singleModalOpen}
        onClose={() => setSingleModalOpen(false)}
        currentUser={activeUser}
      />
    </>
  );
}

export default PostUser;