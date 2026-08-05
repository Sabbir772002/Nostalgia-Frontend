import React, { useEffect } from 'react';
import Feedposts from './Feedposts';
import "../Home/Homepage.css";

const PostSkeleton = () => (
  <div style={{
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    animation: 'pulse 1.5s infinite ease-in-out'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#e2e8f0' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ width: '120px', height: '14px', borderRadius: '4px', backgroundColor: '#e2e8f0' }} />
        <div style={{ width: '80px', height: '10px', borderRadius: '4px', backgroundColor: '#f1f5f9' }} />
      </div>
    </div>
    <div style={{ width: '90%', height: '14px', borderRadius: '4px', backgroundColor: '#f1f5f9' }} />
    <div style={{ width: '70%', height: '14px', borderRadius: '4px', backgroundColor: '#f1f5f9' }} />
    <div style={{ width: '100%', height: '180px', borderRadius: '12px', backgroundColor: '#e2e8f0' }} />
  </div>
);

const Homepage = ({ posts, loadMorePosts, hasMore, loadingMore }) => {
  useEffect(() => {
    if (!loadMorePosts || !hasMore) return;

    let isFetching = false;
    const handleScroll = () => {
      if (window.scrollY > 200 && (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500)) {
        if (hasMore && !loadingMore && !isFetching) {
          isFetching = true;
          loadMorePosts();
          setTimeout(() => { isFetching = false; }, 1000);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePosts, hasMore, loadingMore]);

  return (
    <main className='homepage'>
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>

      {posts && posts.length > 0 ? (
        <>
          <Feedposts posts={posts} />

          <div style={{ margin: '24px 0', textAlign: 'center' }}>
            {loadingMore && <PostSkeleton />}

            {hasMore && !loadingMore && (
              <button
                onClick={loadMorePosts}
                style={{
                  backgroundColor: '#1877f2',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '10px 28px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(24, 119, 242, 0.25)',
                  transition: 'all 0.2s ease',
                }}
              >
                Load More Posts
              </button>
            )}

            {!hasMore && posts.length >= 10 && (
              <p style={{ color: '#8a8d91', fontSize: '0.85rem', fontWeight: 600 }}>
                ✨ You've reached the end of the timeline
              </p>
            )}
          </div>
        </>
      ) : (
        <div style={{ width: '100%', marginTop: '10px' }}>
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
    </main>
  );
};

export default Homepage;