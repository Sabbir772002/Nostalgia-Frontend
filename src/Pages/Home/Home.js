import React, { useState, useEffect, useCallback, useRef } from 'react';
import "../Home/Home.css";
import axios from 'axios';
import Left from "../../Components/LeftSide/Left";
import Middle from "../../Components/MiddleSide/Middle";
import Right from '../../Components/RightSide/Right';
import Nav from '../../Components/Navigation/Nav';
import ServerUrl from '../../api/serverUrl';

const Home = () => {
  const rawUserData = localStorage.getItem('userData');
  const rawUser = rawUserData ? JSON.parse(rawUserData) : {};
  const activeUsername = rawUser.username ? (rawUser.username.includes('@') ? rawUser.username.split('@')[1] : rawUser.username) : '';

  const [posts, setPosts] = useState(() => {
    try {
      const cached = localStorage.getItem('cached_feed_posts');
      return cached ? JSON.parse(cached) : [];
    } catch (e) {
      return [];
    }
  });

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadingRef = useRef(false);
  const pageRef = useRef(1);
  const hasMoreRef = useRef(true);

  const fetchPosts = useCallback((pageNum = 1) => {
    if (!activeUsername || loadingRef.current) return;
    loadingRef.current = true;
    if (pageNum > 1) setLoadingMore(true);

    axios.get(`${ServerUrl.BASE_URL}htimeline`, {
      params: {
        username: activeUsername,
        page: pageNum,
        page_size: 10
      }
    })
    .then(response => {
      const data = response.data;
      let newPosts = [];
      let isMore = false;

      if (data && Array.isArray(data.posts)) {
        newPosts = data.posts;
        isMore = !!data.has_more;
      } else if (Array.isArray(data)) {
        newPosts = data;
        isMore = false;
      }

      if (pageNum === 1) {
        setPosts(newPosts);
        try {
          localStorage.setItem('cached_feed_posts', JSON.stringify(newPosts));
        } catch (e) {
          console.warn('LocalStorage caching error:', e);
        }
      } else {
        setPosts(prev => {
          const existingIds = new Set(prev.map(p => p.id || p.blogid));
          const filteredNew = newPosts.filter(p => !existingIds.has(p.id || p.blogid));
          return [...prev, ...filteredNew];
        });
      }

      hasMoreRef.current = isMore;
      pageRef.current = pageNum;
      setHasMore(isMore);
      setPage(pageNum);
      setLoadingMore(false);
      loadingRef.current = false;
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
      setLoadingMore(false);
      loadingRef.current = false;
    });
  }, [activeUsername]);

  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  const loadMorePosts = useCallback(() => {
    if (!loadingRef.current && hasMoreRef.current) {
      fetchPosts(pageRef.current + 1);
    }
  }, [fetchPosts]);

  const handleRefresh = useCallback(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  const [following, setFollowing] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='interface'>
      <Nav 
        setPosts={setPosts}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      <div className="home">
        <Left />
        <Middle
          posts={posts}
          fetchPosts={handleRefresh}
          loadMorePosts={loadMorePosts}
          hasMore={hasMore}
          loadingMore={loadingMore}
        />
        <Right
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          following={following}
          setFollowing={setFollowing}
        />
      </div>
    </div>
  );
};
export default Home;