import React, { useState } from 'react';
import "../Comments/Comments.css";
import axios from 'axios';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ServerUrl, { getImageUrl } from '../../api/serverUrl';
import ProfileDefaultImg from '../../assets/profile.jpg';

const Comments = ({ cmt, post }) => {
    const [booleonLike, setBooleonLike] = useState(false);
    const likeCount = cmt && cmt.likes ? cmt.likes : 0;
    const [showComment] = useState(false);
    const rawUser = JSON.parse(localStorage.getItem('userData')) || {};
    const currentUser = rawUser.username || localStorage.getItem('username') || '';

    const [commentInput, setCommentInput] = useState({
        author: currentUser,
        content: '',
        blog: post ? (post.blogid || post.id) : null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCommentInput(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (commentInput.content.trim() === '') return;

        axios.post(`${ServerUrl.BASE_URL}comment`, commentInput)
            .then(response => {
                setCommentInput({ ...commentInput, content: '' });
            })
            .catch(error => {
                console.error('There was an error submitting the comment!', error);
            });
    };

    const authorImgSrc = getImageUrl(cmt.author_img || cmt.profilePic);

    return (
        <div className="overAllCommentList">
            <div className="commentList">
                <div className='commentList1'>
                    <div className="commentHead">
                        <div>
                            <img
                                src={authorImgSrc}
                                alt="Profile"
                                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = ProfileDefaultImg;
                                }}
                            />
                        </div>
                        <p><span>{cmt.author_first_name || cmt.author || cmt.username}</span>{cmt.content || cmt.comment}</p>
                    </div>

                    <div className="commentFooter">
                        <p>{cmt.time}</p>
                        <h6>likes by {booleonLike ? likeCount + 1 : likeCount}</h6>
                    </div>
                </div>

                <div className="commentList2">
                    <p
                        className='cp'
                        onClick={() => setBooleonLike(!booleonLike)}
                        style={{ cursor: "pointer" }}
                    >
                        {booleonLike ? <FavoriteRoundedIcon /> : <FavoriteBorderOutlinedIcon />}
                    </p>
                </div>
                <div>
                    <div>
                        {showComment && (
                            <div className="commentSection">
                                <form onSubmit={handleSubmit}>
                                    <div className="cmtGroup">
                                        <input
                                            type="text"
                                            id="commentInput"
                                            name="content"
                                            required
                                            placeholder='Add a comment...'
                                            onChange={handleChange}
                                            value={commentInput.content}
                                        />
                                        <button type='submit'><SendRoundedIcon className='send' /></button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comments;
