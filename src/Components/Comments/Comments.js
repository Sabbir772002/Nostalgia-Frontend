import React, { useState, useEffect } from 'react';
import "../Comments/Comments.css";
import axios from 'axios';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const Comments = ({ cmt, post }) => {
    const [booleonLike, setBooleonLike] = useState(false);
    const [likeCount, setLikeCount] = useState(cmt.likes?cmt.likes:0);
    const [showComment, setShowComment] = useState(false);
    const [commentInput, setCommentInput] = useState({
        author: '',
        content: '',
        blog: post.id,
    });
    const [selectedSentiment, setSelectedSentiment] = useState('');
    const [showSentimentDropdown, setShowSentimentDropdown] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCommentInput(prevState => ({ ...prevState, [name]: value }));
    };

    const handleReplyClick = () => {
        setShowComment(prevShowComment => !prevShowComment); // Toggle the showComment state
    };

    const handleSentimentChange = (e) => {
        setSelectedSentiment(e.target.value);
        setCommentInput(prevState => ({ ...prevState, content: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (commentInput.content.trim() === '') return;

        // Make an API call to submit the comment
        axios.post('http://localhost:8000/api/comments', commentInput)
            .then(response => {
                // Handle the successful response here
                setCommentInput({ ...commentInput, content: '' });
                setSelectedSentiment('');
            })
            .catch(error => {
                // Handle the error here
                console.error('There was an error submitting the comment!', error);
            });
    };

    return (
        <div className="overAllCommentList">
            <div className="commentList">
                <div className='commentList1'>
                    <div className="commentHead">
                        <div><img src={`http://localhost:8000/${cmt.author_img}`} alt="Profile" /></div>
                        <p><span>{cmt.author}</span>{cmt.content}</p>
                    </div>

                    <div className="commentFooter">
                        <p>{cmt.time}</p>
                        <h6>likes by {booleonLike ? likeCount + 1 : likeCount+0} </h6>
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
                                        <SentimentSatisfiedRoundedIcon
                                            className='emoji'
                                            onClick={() => setShowSentimentDropdown(!showSentimentDropdown)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        {showSentimentDropdown && (
                                            <select
                                                id="sentimentSelect"
                                                name="sentiment"
                                                value={selectedSentiment}
                                                onChange={handleSentimentChange}
                                                className="sentimentDropdown"
                                            >
                                                <option value="">Select a sentiment</option>
                                                <option value="Happy">Happy</option>
                                                <option value="Sad">Sad</option>
                                                <option value="Angry">Angry</option>
                                                <option value="Surprised">Surprised</option>
                                            </select>
                                        )}
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
