import React, { useEffect } from 'react';
import FeedUser from './FeedUser';

const UserHome = ({ setUserPostData, userPostData, profileImg, userData, images, posts, fetchPosts, setPosts }) => {
  useEffect(() => {
    if (fetchPosts) {
      fetchPosts();
    }
  }, [fetchPosts]);

  return (
    <div>
      {posts && posts.length ? (
        <FeedUser 
          userData={userData}
          profileImg={profileImg}
          posts={posts}
          setPosts={setPosts}
          images={images}
        /> 
      ) : (
        <p style={{ textAlign: "center", marginBottom: "40px" }}>
          NO POSTS ARE HERE
        </p>
      )}
    </div>
  );
};

export default UserHome;

