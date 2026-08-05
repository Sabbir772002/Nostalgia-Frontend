import React, { useState, useEffect, useRef } from 'react';
import ServerUrl, { getImageUrl } from '../../api/serverUrl';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

const SinglePostModal = ({ blogId, isOpen, onClose, currentUser }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const openTimeRef = useRef(null);

  useEffect(() => {
    if (isOpen && blogId) {
      openTimeRef.current = performance.now();
      setLoading(true);
      setError(null);
      setShowMenu(false);

      const usernameParam = currentUser ? encodeURIComponent(currentUser) : '';
      fetch(`${ServerUrl.BASE_URL}blog_detail?id=${blogId}&username=${usernameParam}`)
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
    } else {
      setPost(null);
    }
  }, [isOpen, blogId, currentUser]);

  const handleClose = () => {
    if (openTimeRef.current && blogId && currentUser) {
      const elapsedSeconds = parseFloat(((performance.now() - openTimeRef.current) / 1000.0).toFixed(2));
      if (elapsedSeconds > 0.5) {
        fetch(`${ServerUrl.BASE_URL}post_view`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: currentUser,
            blog_id: blogId,
            view_duration: elapsedSeconds,
          }),
        }).catch((err) => console.warn("Failed to record view duration:", err));
      }
    }
    openTimeRef.current = null;
    setShowMenu(false);
    onClose();
  };

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

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={handleClose}
    >
      {/* Modal Container: FB Two-Column Layout */}
      <div
        style={{
          backgroundColor: '#000',
          borderRadius: '16px',
          maxWidth: '1150px',
          width: '95%',
          height: '85vh',
          display: 'flex',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT COLUMN: Dark Media / Image Canvas */}
        <div
          style={{
            flex: 1.3,
            backgroundColor: '#0a0a0a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            position: 'relative',
            borderRight: '1px solid #222',
          }}
        >
          {loading ? (
            <div style={{ color: '#aaa', fontSize: '1rem' }}>Loading media preview...</div>
          ) : post && post.blog_img ? (
            <img
              src={getImageUrl(post.blog_img)}
              alt="Post artwork"
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
          ) : (
            <div
              style={{
                background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                color: '#fff',
                padding: '40px',
                borderRadius: '16px',
                maxWidth: '85%',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              }}
            >
              <p style={{ fontSize: '1.25rem', lineHeight: 1.6, fontStyle: 'italic', margin: 0 }}>
                "{post ? post.content : ''}"
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Interactive Sidebar (Author, Details, Comments) */}
        <div
          style={{
            width: '420px',
            minWidth: '340px',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Right Header */}
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid #f0f2f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {post ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={getImageUrl(post.author_img)}
                  alt={post.author}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginRight: '12px',
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = getImageUrl(null);
                  }}
                />
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#050505' }}>
                    {post.author_first_name || post.author} {post.author_last_name || ''}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#65676b' }}>
                    {post.post_date} {post.post_time} {post.author_thana ? `• ${post.author_thana}` : ''}
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Loading...</div>
            )}

            {/* Header Right Actions: 3-Dot Options & Close Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ position: 'relative' }}>
                <MoreVertRoundedIcon
                  onClick={() => setShowMenu(!showMenu)}
                  style={{ cursor: 'pointer', color: '#65676b', fontSize: '22px' }}
                />
                {showMenu && post && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '32px',
                      backgroundColor: '#ffffff',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                      borderRadius: '10px',
                      padding: '6px 0',
                      zIndex: 100,
                      minWidth: '165px',
                      border: '1px solid #e4e6eb',
                    }}
                  >
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/blog/${post.id}`);
                        alert("Post link copied to clipboard!");
                        setShowMenu(false);
                      }}
                      style={{ width: '100%', padding: '10px 16px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.88rem', display: 'flex', gap: '8px', alignItems: 'center', color: '#050505' }}
                    >
                      📋 Copy Link
                    </button>
                    <button
                      onClick={() => {
                        alert("Post saved to bookmarks!");
                        setShowMenu(false);
                      }}
                      style={{ width: '100%', padding: '10px 16px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.88rem', display: 'flex', gap: '8px', alignItems: 'center', color: '#050505' }}
                    >
                      🔖 Save Post
                    </button>
                    <button
                      onClick={() => {
                        alert("Post reported.");
                        setShowMenu(false);
                      }}
                      style={{ width: '100%', padding: '10px 16px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.88rem', color: '#dc2626', display: 'flex', gap: '8px', alignItems: 'center' }}
                    >
                      🚩 Report Post
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleClose}
                style={{
                  background: '#f0f2f5',
                  border: 'none',
                  borderRadius: '50%',
                  width: '34px',
                  height: '34px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#65676b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Right Body: Scrollable Post Content & Comments List */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
            {error && (
              <div style={{ padding: '12px', backgroundColor: '#ffebe9', color: '#c00', borderRadius: '8px' }}>
                {error}
              </div>
            )}

            {post && (
              <>
                {/* Full Text Content */}
                <p style={{ fontSize: '0.95rem', color: '#1c1e21', lineHeight: 1.5, marginBottom: '16px' }}>
                  {post.content}
                </p>

                {/* Like & Comment Summary Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    borderTop: '1px solid #e4e6eb',
                    borderBottom: '1px solid #e4e6eb',
                    marginBottom: '16px',
                  }}
                >
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
                    {post.is_upvoted ? (
                      <FavoriteRoundedIcon style={{ color: '#e41e3f', fontSize: '18px' }} />
                    ) : (
                      <FavoriteBorderOutlinedIcon style={{ fontSize: '18px' }} />
                    )}
                    <span>{post.upvote || 0} Likes</span>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#65676b', fontSize: '0.85rem' }}>
                    <MessageRoundedIcon style={{ fontSize: '16px' }} />
                    <span>{post.comment_count || 0} Comments</span>
                  </div>
                </div>

                {/* Comments Section */}
                <h5 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 700, color: '#333' }}>
                  Comments
                </h5>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {post.comments && post.comments.length > 0 ? (
                    post.comments.map((c) => (
                      <div key={c.id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <img
                          src={getImageUrl(c.author_img)}
                          alt={c.author}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = getImageUrl(null);
                          }}
                        />
                        <div
                          style={{
                            backgroundColor: '#f0f2f5',
                            borderRadius: '12px',
                            padding: '8px 12px',
                            flex: 1,
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.82rem', color: '#050505' }}>
                              {c.author_first_name || c.author}
                            </span>
                            <span style={{ fontSize: '0.72rem', color: '#8a8d91' }}>{c.time}</span>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: '#050505', lineHeight: 1.4 }}>{c.content}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: '#8a8d91', fontSize: '0.82rem', textAlign: 'center', margin: '12px 0' }}>
                      No comments yet. Be the first to comment!
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Right Footer: Fixed Comment Input */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid #f0f2f5', backgroundColor: '#fff' }}>
            <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                style={{
                  flex: 1,
                  backgroundColor: '#f0f2f5',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '10px 14px',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#1877f2',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <SendRoundedIcon style={{ fontSize: '16px' }} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostModal;
