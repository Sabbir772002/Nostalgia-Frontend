import React, { useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import Nav from '../../Components/Navigation/Nav.js';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chat.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaReact } from 'react-icons/fa';
import api from '../../util/api.js';

const useSocket = (url) => {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const socketInstance = io(url);
        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, [url]);
    return socket;
};
const Chat = () => {
    const { fnd } = useParams();
    const [fd, setfd] = useState("");
    const rawUser = JSON.parse(localStorage.getItem('userData')) || {};
    const activeUsername = rawUser.username ? (rawUser.username.includes('@') ? rawUser.username.split('@')[1] : rawUser.username) : '';
    const userData = { ...rawUser, username: activeUsername };

    const [done, setdone] = useState(false);
    const [, setUsers] = useState([]);
    const [userbox, setUserbox] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [search, setSearch] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const socket = useSocket(`${api.url}:5000`);
    const [lastseen, setLastseen] = useState("");
    const [n, setn] = useState("");
    const [e, sete] = useState("");
    const [d, setd] = useState("");
    const [msg, setmsg] = useState("");
    const [fnddata, setfndData] = useState({});
    const [fndname, setfndName] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const chatHistoryRef = useRef(null);

    const decrypt = useCallback(async (message) => {
        try {
            const response = await axios.get(`${api.url}:8001/msgd`, {
                params: {
                    msg: message,
                    e: e,
                    n: n,
                    d: d
                }
            });
            return response.data; 
        } catch (error) {
            console.error('Error fetching decrypted message:', error);
            return message;
        }
    }, [e, n, d]);

    const findname = useCallback((name) => {
        if (!name || !userData.username) return;
        axios.get(`${api.url}:5000/api/findpbvt`, {
            params: { id1: name, id2: userData.username }
        }).then(response => {
            if (response.data) {
                setd(response.data.d || '');
                sete(response.data.e || '');
                setn(response.data.n || '');
            }
        }).catch(error => {
            console.error('Error fetching key data:', error);
        });

        axios.get(`${api.url}:8001/profile/${name}`, {
            params: {
                username: name,
                user: userData.username
            }
        }).then(response => {
            setfndData(response.data || {});
            setfndName(`${response.data.first_name || ''} ${response.data.last_name || ''}`);
            const user = userbox.find(u => u.name === name);
            setLastseen(user ? user.lastSeen : '');
        }).catch(error => {
            console.error('Error fetching user data:', error);
        });
    }, [userData.username, userbox]);

    const msgbox = useCallback(async () => {
        if (!userData.username || !fd) return;
        try {
            const response = await axios.get(`${api.url}:5000/api/messages/`, {
                params: {
                    id1: userData.username,
                    id2: fd
                }
            });
            const encryptedMessages = response.data || [];
            const decryptedMessages = await Promise.all(
                encryptedMessages.map(async (message) => {
                    const decryptedContent = await decrypt(message.content);
                    return { ...message, content: decryptedContent }; 
                })
            );
            setMessages(decryptedMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }, [userData.username, fd, decrypt]);

    useEffect(() => {
        if (fnd && !done) {
            setfd(fnd);
            findname(fnd);
            msgbox();
        }
    }, [fnd, done, findname, msgbox]);

    const encrypt = (message) => {
        axios.get(`${api.url}:8001/msge`, {
            params: {
                msg: message,
                e: e,
                n: n,
                d: d
            }
        }).then(response => {
            setmsg(response.data);
        }).catch(error => {
            console.error('Error encrypting message:', error);
        });
    };

    const fetchUserImage = useCallback(async (username, currentUser) => {
        try {
            const response = await axios.get(`${api.url}:8001/profile/${username}`, {
                params: {
                    username: username,
                    user: currentUser
                }
            });
            return response.data.pp;
        } catch (error) {
            console.error('Error fetching user image:', error);
            return null;
        }
    }, []);

    const fetchUserImages = useCallback(async (userList) => {
        const userImages = await Promise.all(userList.map(async (user) => {
            try {
                return await fetchUserImage(user.name, userData.username);
            } catch (error) {
                console.error('Error fetching user image:', error);
                return null;
            }
        }));
    
        const updatedUserBox = userList.map((user, index) => ({
            id: user.id,
            name: user.name,
            online: user.online,
            lastSeen: user.lastSeen,
            img: userImages[index]
        }));
        setUserbox(updatedUserBox);
    }, [userData.username, fetchUserImage]);

    const finduserlist = useCallback(async () => {
        if (!userData.username) return;
        try {
            const response = await axios.get(`${api.url}:5000/api/userbox/` + userData.username);
            const userList = (response.data || []).map((user, index) => ({
                id: index + 1,
                name: user.username,
                online: user.online,
                lastSeen: user.lastSeen
            }));
    
            setUsers(userList);
    
            if (userList.length > 0 && !fnd && !done) {
                setLastseen(userList[0].lastSeen);
                setfd(userList[0].name);
                msgbox();
                findname(userList[0].name);
            }
    
            fetchUserImages(userList);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, [userData.username, fnd, done, msgbox, findname, fetchUserImages]);

    useEffect(() => {
        if (!socket) return;
        socket.on('users status', (usersStatus) => {
            setUserbox(prevUserBox => {
                return prevUserBox.map(user => {
                    const status = usersStatus.find(s => s.username.toLowerCase() === user.name.toLowerCase());
                    if (status) {
                        return {
                            ...user,
                            online: status.online,
                            lastSeen: status.online ? '' : status.lastSeen
                        };
                    }
                    return user;
                });
            });
        });
    }, [socket, messages]);

    useEffect(() => {
        if (!socket) return;
        
        socket.on('connect', () => {
            console.log('Socket connected');
        });
        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });
        socket.on('chat message', async (message) => {
            if (String(message.sender).toLowerCase() === String(fd).toLowerCase() && String(message.receiver).toLowerCase() === String(userData.username).toLowerCase()) {
                try {
                    message.content = await decrypt(message.content);
                } catch (error) {
                    console.error("Error decrypting content:", error);
                    message.content = "Message received";
                }
                setMessages(prevMessages => [...prevMessages, message]);
                const chatHistory = document.getElementById('chat-history');
                if (chatHistory) {
                    chatHistory.scrollTop = chatHistory.scrollHeight - chatHistory.clientHeight;
                }
            }
        });
        
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('chat message');
        };
    }, [socket, messages, fd, userData.username, decrypt]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (socket) socket.disconnect();
        };

        const handlePageFocus = () => {
            if (socket) socket.connect();
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('focus', handlePageFocus);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('focus', handlePageFocus);
        };
    }, [socket]);

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const sendMessage = async () => {
        encrypt(newMessage);
        if (selectedImage) {
            const formData = new FormData();
            formData.append('image', selectedImage);

            const message = {
                id: messages.length + 1,
                sender: userData.username,
                receiver: fd,
                content: '',
                time: new Date().toLocaleTimeString(),
                date: new Date().toLocaleDateString(),
                img: 1,
                image: formData,
            };

            socket.emit('chat message', message);
            setNewMessage('');
            setSelectedImage(null);
        } else if (newMessage.trim() !== '') {
            const message = {
                id: messages.length + 1,
                sender: userData.username,
                receiver: fd,
                content: msg,
                time: new Date().toLocaleTimeString(),
                date: new Date().toLocaleDateString(),
                img: 0,
                image: null
            }; 
            const newmsg = {
                id: messages.length + 1,
                sender: userData.username,
                receiver: fd,
                content: newMessage,
                time: new Date().toLocaleTimeString(),
                date: new Date().toLocaleDateString(),
                img: 0,
                image: null
            };
            setMessages((prevMessages) => [...prevMessages, newmsg]);

            socket.emit('set username', userData.username);
            socket.emit('chat message', message);   
            setNewMessage('');
            setmsg('');
            axios.post(`${api.url}:5000/api/messages`, message).catch(console.error);
        }
    };

    useEffect(() => {
        if (fd) {
            msgbox();
            findname(fd);
        } 
    }, [fd, msgbox, findname]);

    const handleNameClick = (name) => {
        setdone(true);
        setfd(name);
        findname(name);
        msgbox();
    }; 

    useEffect(() => {
        finduserlist();
    }, [socket, fd, finduserlist]);

    const scrollToBottom = () => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    };

    function getLastSeenTime(lastSeen) {
        if (!lastSeen) return '';
        const currentTime = new Date();
        const lastSeenTime = new Date(lastSeen);
        const timeDifference = currentTime.getTime() - lastSeenTime.getTime();
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `left ${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `left ${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `left ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return `left a few seconds ago`;
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className='interface'>
            <Nav
                search={search}
                setSearch={setSearch}
                showMenu={showMenu}
                setShowMenu={setShowMenu}
            />
            <div className='bot mt-2' style={{ position: 'fixed', marginBottom: '20px' }}>
                <div className='row clearfix'>
                    <div className='card chat-app'>
                        <div className='col-lg-3'>
                            <div id='plist' className='people-list'>
                                <h2>Recent Message</h2>
                                <hr />
                                <ul className='list-unstyled chat-list mt-2 mb-0' style={{ maxHeight: '500px', overflowY: 'auto', marginBottom: '20px' }}>
                                    {userbox.map((user) => (
                                        <li key={user.id} className='clearfix' onClick={() => handleNameClick(user.name)}>
                                            <img src={`${api.url}:8001/${user.img}`} alt='avatar' className="circle" style={{ width: '50px', height: '50px' }} />
                                            <div className='about'>
                                                <div className='name'>{user.name}</div>
                                                <div className="status">
                                                    <i className={`fa fa-circle ${user.online ? 'online' : 'offline'}`}></i> {user.online ? 'Online' : getLastSeenTime(user.lastSeen)}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className='chat'>
                            <div className='chat-header clearfix'>
                                <div className='row'>
                                    <div className='col-lg-6 d-flex align-items-center gap-3'>
                                        <img src={`${api.url}:8001/${fnddata.pp}`} alt='avatar' className="circle" style={{ width: '50px', height: '50px' }} />
                                        <div className='chat-about'>
                                            <Link to={`/profile/${fd}`} className="text-dark text-decoration-none">
                                                <h6 className='m-b-0 fw-bold'>{fndname}</h6>
                                                <small>{fd && userbox.find(user => user.name === fd)?.online ? 'online' : getLastSeenTime(lastseen)}</small>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className='col-lg-6 box-right d-flex gap-2 justify-content-end'>
                                        <button type="button" className='btn btn-outline-secondary'>
                                            <i className='fas fa-camera'></i>
                                        </button>
                                        <button type="button" className='btn btn-outline-primary'>
                                            <i className='fas fa-image'></i>
                                        </button>
                                        <button type="button" className='btn btn-outline-info'>
                                            <i className='fas fa-cogs'></i>
                                        </button>
                                        <button type="button" className='btn btn-outline-warning'>
                                            <i className='fas fa-question'></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='chat-history' ref={chatHistoryRef} id='chat-history' style={{ height: '420px', overflowY: 'scroll' }}>
                                <ul className='m-b-0'>
                                    {messages.map((message, index) => (
                                        <li key={index} className='clearfix mb-2'>
                                            {message.sender === userData.username ? (
                                                <div className="message-data box-right text-end">
                                                    <span className="message-data-time m-2">{message.time}</span>
                                                    <br/>
                                                    <div className="message my-message msg-right bg-primary text-light d-inline-block p-2 rounded">{message.content}</div> 
                                                </div>
                                            ) : (
                                                <div className="message-data text-start">
                                                    <span className="message-data-time">{message.time}</span>
                                                    <br/>
                                                    <div className="message my-message bg-dark text-light d-inline-block p-2 rounded">{message.content}</div>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='chat-message clearfix p-3 border-top'>
                                <div className='input-group mb-0'>
                                    <div className="input-group-prepend" style={{ width: '40px', height: '48px', position: 'relative' }}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageSelect}
                                            style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', zIndex: 1, cursor: 'pointer' }}
                                        />
                                        <FaReact style={{ width: '100%', height: '100%', color: '#61dafb', pointerEvents: 'none' }} />
                                    </div>

                                    <input
                                        type='text'
                                        className='form-control ms-2'
                                        style={{ height: '48px' }}
                                        placeholder='Enter text here...'
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                sendMessage();
                                            }
                                        }}
                                    />
                                    <div className='input-group-append ms-2'>
                                        <button className='btn btn-primary px-4' style={{ height: '48px' }} type='button' onClick={sendMessage}>
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Chat;