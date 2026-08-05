import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Nav from '../../Components/Navigation/Nav';
import Left from '../../Components/LeftSide/Left';
import ServerUrl, { getImageUrl } from '../../api/serverUrl';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import ProfileImg from "../../assets/profile.jpg";

const SingleBlogPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const openTimeRef = useRef(null);

  const rawUser = JSON.parse(localStorage.getItem('userData')) || {};
  const currentUser = rawUser.username || localStorage.getItem('username') || '';

  useEffect(() => {
    openTimeRef.current = performance.now();
    setLoading(true);
    setError(null);

    const usernameParam = currentUser ? encodeURIComponent(currentUser) : '';
    fetch(`${ServerUrl.BASE_URL}blog_detail?id=${id}&username=${usernameParam}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setPost(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog detail:", err);
        setError("Failed to load post detail.");
        setLoading(false);
      });

    return () => {
      if (openTimeRef.current && id && currentUser) {
        const elapsedSeconds = parseFloat(((performance.now() - openTimeRef.current) / 1000.0).toFixed(2));
        if (elapsedSeconds > 0.5) {
          fetch(`${ServerUrl.BASE_URL}post_view`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: currentUser,
              blog_id: id,
              view_duration: elapsedSeconds,
            }),
          }).catch((err) => console.warn("Failed to record view duration:", err));
        }
      }
    };
  }, [id, currentUser]);

  const handleUpvote = () => {
    if (!post || !currentUser) return;
    fetch(`${ServerUrl.BASE_URL}upvote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: post.id, username: currentUser }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPost((prev) => ({
          ...prev,
          upvote: data.upvote !== undefined ? data.upvote : prev.upvote,
          is_upvoted: data.is_upvoted !== undefined ? data.is_upvoted : !prev.is_upvoted,
        }));
      })
      .catch((err) => console.error("Error upvoting post:", err));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim() || !post || !currentUser) return;

    fetch(`${ServerUrl.BASE_URL}comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        blog: post.id,
        author: currentUser,
        content: commentInput.trim(),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        const newCmnt = {
          id: Date.now(),
          author: currentUser,
          author_first_name: currentUser,
          author_img: null,
          content: commentInput.trim(),
          time: "Just now",
        };
        setPost((prev) => ({
          ...prev,
          comments: [...(prev.comments || []), newCmnt],
          comment_count: (prev.comment_count || 0) + 1,
        }));
        setCommentInput('');
      })
      .catch((err) => console.error("Error adding comment:", err));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Post link copied to clipboard!");
    setShowOptions(false);
  };

  return (
    <div className='interface' style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Nav search="" setSearch={() => {}} showMenu={false} setShowMenu={() => {}} profileImg={ProfileImg} />
      
      <div className="home" style={{ maxWidth: '1200px', margin: '24px auto', padding: '0 16px', display: 'flex', gap: '24px' }}>
        <Left following={3} setFollowing={() => {}} profileImg={ProfileImg} />

        <div style={{ flex: 1 }}>
          {loading && (
            <div style={{ padding: '60px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '16px' }}>
              <h3>Loading post details...</h3>
            </div>
          )}

          {error && (
            <div style={{ padding: '24px', backgroundColor: '#ffebe9', color: '#c00', borderRadius: '16px' }}>
              <h3>{error}</h3>
              <Link to="/home">Return to Home Feed</Link>
            </div>
          )}

          {post && (
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                overflow: 'hidden',
                display: 'flex',
                minHeight: '650px',
              }}
            >
              {/* Media Preview Column */}
              <div
                style={{
                  flex: 1.3,
                  backgroundColor: '#0a0a0a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '24px',
                }}
              >
                {post.blog_img ? (
                  <img
                    src={getImageUrl(post.blog_img)}
                    alt="Post Artwork"
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px' }}
                  />
                ) : (
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                      color: '#fff',
                      padding: '40px',
                      borderRadius: '16px',
                      textAlign: 'center',
                      maxWidth: '90%',
                    }}
                  >
                    <p style={{ fontSize: '1.25rem', lineHeight: 1.6, fontStyle: 'italic', margin: 0 }}>
                      "{post.content}"
                    </p>
                  </div>
                )}
              </div>

              {/* Sidebar Column */}
              <div style={{ width: '420px', display: 'flex', flexDirection: 'column', borderLeft: '1px solid #eee' }}>
                {/* Header */}
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f2f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                  <Link to={`/profile/${post.author}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <img
                      src={getImageUrl(post.author_img)}
                      alt={post.author}
                      style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', marginRight: '12px' }}
                      onError={(e) => { e.target.onerror = null; e.target.src = getImageUrl(null); }}
                    />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#050505' }}>
                        {post.author_first_name || post.author} {post.author_last_name || ''}
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: '#65676b' }}>
                        {post.post_date} {post.post_time}
                      </p>
                    </div>
                  </Link>

                  <div style={{ position: 'relative' }}>
                    <MoreVertRoundedIcon
                      onClick={() => setShowOptions(!showOptions)}
                      style={{ cursor: 'pointer', color: '#65676b' }}
                    />
                    {showOptions && (
                      <div
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: '30px',
                          backgroundColor: '#fff',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                          borderRadius: '8px',
                          padding: '8px 0',
                          zIndex: 10,
                          minWidth: '150px',
                        }}
                      >
                        <button onClick={handleCopyLink} style={{ width: '100%', padding: '8px 16px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer' }}>
                          📋 Copy Link
                        </button>
                        <button onClick={() => { alert("Post saved!"); setShowOptions(false); }} style={{ width: '100%', padding: '8px 16px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer' }}>
                          🔖 Save Post
                        </button>
                        <button onClick={() => { alert("Post reported."); setShowOptions(false); }} style={{ width: '100%', padding: '8px 16px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', color: '#c00' }}>
                          🚩 Report Post
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content & Comments */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
                  <p style={{ fontSize: '0.95rem', color: '#1c1e21', lineHeight: 1.5, marginBottom: '16px' }}>
                    {post.content}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: '1px solid #e4e6eb', borderBottom: '1px solid #e4e6eb', marginBottom: '16px' }}>
                    <button
                      onClick={handleUpvote}
                      style={{
                        background: post.is_upvoted ? '#e7f3ff' : 'transparent',
                        color: post.is_upvoted ? '#1877f2' : '#65676b',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      {post.is_upvoted ? <FavoriteRoundedIcon style={{ color: '#e41e3f' }} /> : <FavoriteBorderOutlinedIcon />}
                      <span>{post.upvote || 0} Likes</span>
                    </button>

                    <span style={{ fontSize: '0.85rem', color: '#65676b' }}>
                      <MessageRoundedIcon style={{ fontSize: '16px', marginRight: '4px' }} />
                      {post.comment_count || 0} Comments
                    </span>
                  </div>

                  <h5 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 700 }}>Comments</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {post.comments && post.comments.length > 0 ? (
                      post.comments.map((c) => (
                        <div key={c.id} style={{ display: 'flex', gap: '10px' }}>
                          <img
                            src={getImageUrl(c.author_img)}
                            alt={c.author}
                            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                            onError={(e) => { e.target.onerror = null; e.target.src = getImageUrl(null); }}
                          />
                          <div style={{ backgroundColor: '#f0f2f5', borderRadius: '12px', padding: '8px 12px', flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                              <strong style={{ fontSize: '0.82rem' }}>{c.author_first_name || c.author}</strong>
                              <small style={{ color: '#8a8d91', fontSize: '0.72rem' }}>{c.time}</small>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.85rem' }}>{c.content}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: '#8a8d91', fontSize: '0.82rem', textAlign: 'center' }}>No comments yet.</p>
                    )}
                  </div>
                </div>

                {/* Input Footer */}
                <div style={{ padding: '12px 16px', borderTop: '1px solid #f0f2f5' }}>
                  <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      style={{ flex: 1, backgroundColor: '#f0f2f5', border: 'none', borderRadius: '20px', padding: '10px 14px', outline: 'none' }}
                    />
                    <button type="submit" style={{ backgroundColor: '#1877f2', color: '#fff', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <SendRoundedIcon style={{ fontSize: '16px' }} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;
