import React, { useEffect, useState, useCallback } from 'react';
import "../Notification/Notification.css";
import { AiOutlineHome, AiOutlineLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { FaUserFriends, FaWalking } from "react-icons/fa";
import { MdOutlineCardTravel, MdOutlineEventNote } from "react-icons/md";
import ProfileImg from "../../assets/profile.jpg";
import { Link } from 'react-router-dom';
import axios from 'axios';
import ServerUrl, { getImageUrl } from '../../api/serverUrl';

const Notification = () => {
  const user = JSON.parse(localStorage.getItem('userData')) || {};
  const [notification, setNotification] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetchData = useCallback(() => {
    const username = user.username || localStorage.getItem('username');
    if (!username) return;

    axios
      .get(`${ServerUrl.BASE_URL}notification`, {
        params: { username: username },
      })
      .then((response) => {
        setNotification(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
      });
  }, [user.username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'Upvote':
        return <AiOutlineLike style={{ color: '#1877f2' }} />;
      case 'Comment':
        return <BiCommentDetail style={{ color: '#42b72a' }} />;
      case 'Bondhu':
        return <FaUserFriends style={{ color: '#f7b928' }} />;
      case 'Walk':
        return <FaWalking style={{ color: '#9c27b0' }} />;
      case 'Trip':
        return <MdOutlineCardTravel style={{ color: '#ff5722' }} />;
      case 'Event':
        return <MdOutlineEventNote style={{ color: '#00bcd4' }} />;
      default:
        return <BiCommentDetail style={{ color: '#1877f2' }} />;
    }
  };

  const timeAgo = (timestamp) => {
    if (!timestamp) return 'Recently';
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
    if (isNaN(seconds) || seconds < 0) return 'Just now';

    let interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval}d ago`;

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval}h ago`;

    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval}m ago`;

    return 'Just now';
  };

  const filteredNotifications = notification.filter((noti) => {
    if (filter === 'all') return true;
    if (filter === 'interactions') return ['Upvote', 'Comment'].includes(noti.type);
    if (filter === 'requests') return ['Bondhu', 'Walk', 'Trip', 'Event'].includes(noti.type);
    return true;
  });

  const currentUserAvatar = getImageUrl(user.pp || user.p_image);

  return (
    <div className="noti-overall" style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', paddingBottom: '40px' }}>
      <div
        className="nav-section"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 32px',
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          marginBottom: '24px',
        }}
      >
        <Link to="/home" style={{ textDecoration: 'none' }} className="noti-div">
          <AiOutlineHome className="noti-Home-Icon" style={{ fontSize: '28px', color: '#1877f2' }} />
        </Link>
        <Link to={`/profile/${user.username || localStorage.getItem('username')}`}>
          <img
            src={currentUserAvatar}
            alt="Profile"
            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = ProfileImg;
            }}
          />
        </Link>
      </div>

      <div
        className="notification-group"
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '24px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#1c1e21' }}>Notifications</h1>
          <span
            style={{
              backgroundColor: '#e7f3ff',
              color: '#1877f2',
              fontWeight: 700,
              fontSize: '0.85rem',
              padding: '4px 12px',
              borderRadius: '12px',
            }}
          >
            {notification.length} Total
          </span>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {['all', 'interactions', 'requests'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                border: 'none',
                borderRadius: '20px',
                padding: '8px 18px',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                textTransform: 'capitalize',
                backgroundColor: filter === tab ? '#1877f2' : '#f0f2f5',
                color: filter === tab ? '#ffffff' : '#65676b',
                transition: 'all 0.2s ease',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="notification-section" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((noti, index) => (
              <div
                key={noti.id || index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e4e6eb',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  transition: 'transform 0.15s ease, boxShadow 0.15s ease',
                  cursor: 'pointer',
                }}
              >
                <div style={{ position: 'relative', marginRight: '16px' }}>
                  <img
                    src={getImageUrl(noti.img)}
                    alt={noti.sender}
                    style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = ProfileImg;
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      right: '-2px',
                      backgroundColor: '#ffffff',
                      borderRadius: '50%',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                    }}
                  >
                    {getNotificationIcon(noti.type)}
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: '#050505', lineHeight: 1.4 }}>
                    <strong style={{ fontWeight: 700 }}>{noti.sender}</strong>{' '}
                    <span style={{ color: '#4b4c4f' }}>{noti.msg}</span>
                  </p>
                  <small style={{ color: '#1877f2', fontWeight: 600, fontSize: '0.78rem' }}>
                    {timeAgo(noti.time || noti.date)}
                  </small>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#8a8d91' }}>
              <p style={{ fontSize: '1rem', margin: 0 }}>No notifications found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;