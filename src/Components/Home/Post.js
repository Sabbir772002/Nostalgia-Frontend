import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import "../Home/Post.css";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { AiOutlineDelete } from "react-icons/ai";
import Comments from '../Comments/Comments';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ServerUrl, { getImageUrl } from '../../api/serverUrl';
import ProfileDefaultImg from "../../assets/profile.jpg";

const Post = ({ post, posts }) => {
  const [postbox, setPostbox] = useState(post);
  const [comments, setComments] = useState([]);
  const [filledLike, setFilledLike] = useState(post.is_upvoted ? <FavoriteRoundedIcon /> : <FavoriteBorderOutlinedIcon />);
  const [showDelete, setShowDelete] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const userdata = JSON.parse(localStorage.getItem('userData')) || {};
  const [commentInput, setCommentInput] = useState({
    author: userdata.username,
    content: '',
    blog: post.id || post.blogid,
  });

  const fetchComments = useCallback(async (postId) => {
    try {
      const response = await axios.get(`${ServerUrl.BASE_URL}comments`, {
        params: {
          username: post.author,
          blog: postId || post.id || post.blogid
        }
      });
      setComments(response.data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [post.author, post.id, post.blogid]);

  useEffect(() => {
    fetchComments(postbox.id || postbox.blogid);
  }, [fetchComments, postbox.id, postbox.blogid]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.content.trim()) return;
    try {
      await axios.post(`${ServerUrl.BASE_URL}comment`, commentInput);
      alert('Comment created successfully');
      setCommentInput({ 
        author: userdata.username,
        content: '',
        blog: post.id || post.blogid,
      });
      fetchComments(postbox.id || postbox.blogid);
    } catch (error) {
      console.error('Error creating comment:', error);
      alert('Error creating comment. Please try again.');
    }
  };

  const handleLike = async () => {
    try {
      const upvotedata = {
        username: userdata.username,
        id: postbox.id || postbox.blogid,
        time: moment().fromNow(),
      };
      const response = await axios.post(`${ServerUrl.BASE_URL}upvote`, { ...upvotedata });
      setFilledLike(response.data.is_upvoted ? <FavoriteRoundedIcon /> : <FavoriteBorderOutlinedIcon />);
      setPostbox(prev => ({
        ...prev,
        upvote: response.data.upvote !== undefined ? response.data.upvote : prev.upvote,
        is_upvoted: response.data.is_upvoted !== undefined ? response.data.is_upvoted : !prev.is_upvoted
      }));
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(`${ServerUrl.BASE_URL}posts`, { id: id });
    } catch (error) {
      console.error('Error deleting the post:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentInput(prevState => ({ ...prevState, [name]: value }));
  };

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(postbox.content);

  const handleEdit = () => {
    setEditedContent(postbox.content);
    setEditModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const updatedPost = { ...postbox, content: editedContent };
      await axios.put(`${ServerUrl.BASE_URL}posts`, updatedPost);
      setPostbox(updatedPost);
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className='post'>
      <div className='post-header'>
        <div className='post-user' style={{ cursor: "pointer" }}>
          <img
            src={getImageUrl(postbox.author_img)}
            className='p-img'
            alt={postbox.author}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = ProfileDefaultImg;
            }}
          />
          <div className='post-user-info'>
            <Link to={`/profile/${postbox.author}`} style={{ textDecoration: "none", color: "inherit" }}>
              <h2>{postbox.author}</h2>
            </Link>
            <Link to={`/blog/${postbox.blogid || postbox.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <p className='datePara' style={{ cursor: "pointer" }}>{postbox.post_date}</p>
            </Link>
          </div>
        </div>

        <div className='delete'>
          {showDelete && (
            <div className="options">
              {postbox.author === userdata.username && (
                <>
                  <button onClick={() => handleDelete(postbox.id || postbox.blogid)}><AiOutlineDelete />Delete</button>
                  <button onClick={() => handleEdit()}><AiOutlineDelete />Edit Post</button>
                </>
              )}
            </div>
          )}
          <MoreVertRoundedIcon className='post-vertical-icon' onClick={() => setShowDelete(!showDelete)}/>
        </div>
      </div>

      {editModalOpen && (
        <div className="edit-modal">
          <textarea
            className="edit-textarea"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={4}
            cols={50}
            placeholder="Edit your post..."
          />
          <div className="edit-buttons">
            <button className="update-button" onClick={handleUpdate}>Update</button>
            <button className="cancel-button" onClick={() => setEditModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      <p className='body'>
        {postbox.content && postbox.content.length <= 300 ?
          postbox.content : `${(postbox.content || '').slice(0, 300)}...`
        }
      </p>

      {postbox.blog_img && (
        <img
          src={getImageUrl(postbox.blog_img)}
          alt=""
          className="post-img"
        />
      )}

      <div className="post-foot">
        <div className="post-footer">
          <div className="like-icons">
            <p className='heart' onClick={handleLike} style={{ cursor: "pointer" }}>
              {filledLike}
            </p>

            <MessageRoundedIcon onClick={() => setShowComment(!showComment)} className='msg' style={{ cursor: "pointer" }} />
          </div>
          <div className="like-comment-details">
            <span className='post-like'>{postbox.upvote || 0} Upvote</span>
            <span className='post-comment'>{comments.length} comments</span>
          </div>

          {showComment && (
            <div className="commentSection">
              <form onSubmit={handleCommentSubmit}>
                <div className="cmtGroup">
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
