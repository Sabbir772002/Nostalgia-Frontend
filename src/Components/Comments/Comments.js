import React, { useState, useEffect } from 'react';
import "../Comments/Comments.css";
import axios from 'axios';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const Comments = ({ cmt, post }) => {
    const [booleonLike, setBooleonLike] = useState(false);
    const [likeCount, setLikeCount] = useState(cmt.likes);
    const [showComment, setShowComment] = useState(false);
    const [commentInput, setCommentInput] = useState({
        author: '',
        content: '',
        blog: post.id,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCommentInput(prevState => ({ ...prevState, [name]: value }));
    };

    const handleReplyClick = () => {
        setShowComment(showComment); // Toggle the showComment state
    };

    return (
        <div className="overAllCommentList">
            <div className="commentList">
                <div className='commentList1'>
                    <div className="commentHead">
                        <div><img src={`http://localhost:8000/${cmt.author_img}`} alt="Profile" /></div>
                        <p><span>{cmt.username}</span>{cmt.content}</p>
                    </div>

                    <div className="commentFooter">
                        <p>{cmt.time}</p>
                        <h4>{booleonLike ? likeCount + 1 : likeCount} likes</h4>
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
                                <form onSubmit=''>
                                    <div className="cmtGroup">
                                        <SentimentSatisfiedRoundedIcon className='emoji' />
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
}

export default Comments;
