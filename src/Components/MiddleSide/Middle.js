import React from 'react';
import InputPost from '../Post/InputPost';
import Homepage from "../Home/Homepage";
import "../MiddleSide/Middle.css";

const Middle = ({ posts, fetchPosts, loadMorePosts, hasMore, loadingMore }) => {
  return (
    <div className='M-features'>
      <InputPost fetchPosts={fetchPosts} />
      <Homepage 
        posts={posts}
        fetchPosts={fetchPosts}
        loadMorePosts={loadMorePosts}
        hasMore={hasMore}
        loadingMore={loadingMore}
      />
    </div>
  );
};

export default Middle;