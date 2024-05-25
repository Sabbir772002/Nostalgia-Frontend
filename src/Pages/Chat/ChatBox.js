import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Nav from '../../Components/Navigation/Nav';
import { useLocation, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chat.css';
import axios from 'axios';

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
    const [newfnd, setNewfnd] = useState("");
    const [fd, setfd] = useState("");
    
    useEffect(() => {
        if (fnd) {
            const capitalizedFnd = fnd.charAt(0).toUpperCase() + fnd.slice(1);
            setNewfnd(capitalizedFnd);
            setfd(fnd);
                    }
    }, [fnd]);
    
    const location = useLocation();
    const userData = JSON.parse(localStorage.getItem('userData'));

    console.log(fnd);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [search, setSearch] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const socket = useSocket('http://localhost:5000');
    useEffect(() => {
        // Fetch unique users
        axios.get('http://localhost:5000/api/userbox/' + userData.username)
            .then(response => {
                const userList = response.data.map((username, index) => ({
                    id: index + 1,
                    name: username
                }));
                setUsers(userList);
                if (userList.length > 0 && newfnd == "") {
                    setNewfnd(userList[0].name);
                
                } if (userList.length > 0 && newfnd == "") {
                    setNewfnd(userList[0].name);
                    setfd(userList[0].name);

                
                }
                if (fnd) {
                    setfd(fd);
                    setNewfnd(fnd);
                }
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);


    useEffect(() => {
        if (!socket) return;

        socket.on('connect', () => {
            console.log('Socket connected');
        });
        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });
        socket.on('chat message', (message) => {
            console.log('New message received:', message);

            const messageExists = messages.some(msg => msg === message);

            if (!messageExists) {
                setMessages(prevMessages => [...prevMessages, message]);
            }
        });
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('chat message');
        };
    }, [socket, messages]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            console.log('Leaving page, disconnecting socket');
            socket.disconnect();
        };

        const handlePageFocus = () => {
            console.log('Returning to page, reconnecting socket');
            socket.connect();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('focus', handlePageFocus);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('focus', handlePageFocus);
        };
    }, [socket]);

    const sendMessage = () => {
        if (newMessage.trim() !== '') {
            const message = {
                id: messages.length + 1,
                sender: userData.username,
                receiver: newfnd,
                content: newMessage,
                time: new Date().toLocaleTimeString(),
                date: new Date().toLocaleDateString(),
                img:0
            };
            socket.emit('set username', userData.username);
            socket.emit('chat message', message);
            
            setNewMessage('');
            const chatHistory = document.getElementById('chat-history');
            chatHistory.scrollTop = chatHistory.scrollHeight - chatHistory.clientHeight;
                  // Save message to MongoDB using Axios
        axios.post('http://localhost:5000/api/messages', message)
        .then(response => {
            console.log('Message saved:', response.data);
        })
        .catch(error => {
            console.error('Error saving message:', error);
        });
        }
    };
    const msgbox = async () => {
        axios.get('http://localhost:5000/api/messages/', {
            params: {
                id1: userData.username,
                id2: fd
            }
        })
        .then(response => {
            console.log('Message Retrieve:', response.data);
            setMessages(response.data);
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
        });
    }
    useEffect(() => {
        if (newfnd) {
            msgbox();
        } 
    }, [newfnd]);
    const handleNameClick = (name) => {
        setNewfnd(name);
        setfd(name);
        console.log("msg box of : "+name);
        
    };

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
                                <h2>Friends List</h2>
                                <div className='input-group'>
                                    {/* <div className='input-group-prepend'>
                                        <span className='input-group-text' style={{ height: '38px' }}>
                                            <i className='fas fa-search' style={{ fontSize: '16px' }}></i>
                                        </span>
                                    </div> */}
                                    <input type='text' className='form-control' style={{ height: '38px' }} placeholder='Search...' />
                                </div>
                                <hr />
                                <ul className='list-unstyled chat-list mt-2 mb-0' style={{ maxHeight: '500px', overflowY: 'auto', marginBottom: '20px' }}>
                                {users.map((user) => (
                                    <li key={user.id} className='clearfix'  onClick={() => handleNameClick(user.name)}>
                                        <img src='https://bootdey.com/img/Content/avatar/avatar1.png' alt='avatar' />
                                        <div className='about'>
                                            <div className='name'>
                                                {user.name}
                                            </div>
                                            <div className="status">
                                                <i className="fa fa-circle offline"></i> left 7 mins ago
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
                                    <div className='col-lg-6'>
                                        <a href='javascript:void(0);' data-toggle='modal' data-target='#view_info'>
                                            <img src='https://bootdey.com/img/Content/avatar/avatar2.png' alt='avatar' />
                                        </a>
                                        <div className='chat-about'>
                                            <h6 className='m-b-0'>{newfnd}</h6>
                                            <small>Last seen: 2 hours ago</small>
                                        </div>
                                    </div>
                                    <div className='col-lg-6 box-right'>
                                        <a href='javascript:void(0);' className='btn btn-outline-secondary'>
                                            <i className='fas fa-camera'></i>
                                        </a>
                                        <a href='javascript:void(0);' className='btn btn-outline-primary'>
                                            <i className='fas fa-image'></i>
                                        </a>
                                        <a href='javascript:void(0);' className='btn btn-outline-info'>
                                            <i className='fas fa-cogs'></i>
                                        </a>
                                        <a href='javascript:void(0);' className='btn btn-outline-warning'>
                                            <i className='fas fa-question'></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='chat-history' id='chat-history'>
                                <ul className='m-b-0' style={{ maxHeight: '370px', overflowY: 'auto' }}>
                                 {messages.map((message, index) => (
                                        <li key={index} className='clearfix'>
                                            {message.sender == userData.username ? (
                                                <>
                                                    <div className="message-data box-right">
                                                        <span className="message-data-time">{message.time}</span>
                                                    <img src={`http://localhost:8000/${userData.p_image}`} alt="User" className="rounded" style={{ width: '50px', height: '50px' }} />
                                                    </div>
                                                    <div className="message other-message float-right">{message.content}</div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="message-data">
                                                        <span className="message-data-time">{message.time}</span>
                                                    </div>
                                                    <div className="message my-message">{message.content}</div>
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='chat-message clearfix'>
                                <div className='input-group mb-0'>
                                    {/* <div className='input-group-prepend'>
                                        <span className='input-group-text' style={{ height: '38px' }}>
                                            <i className='fas fa-paper-plane' style={{ fontSize: '16px' }}></i>
                                        </span>
                                    </div> */}
                                    <input
                                        type='text'
                                        className='form-control'
                                        style={{ height: '38px' }}
                                        placeholder='Enter text here...'
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                sendMessage();
                                            }
                                        }}
                                    />
                                    <div className='input-group-append'>
                                        <button className='btn btn-primary' type='button' onClick={sendMessage}>
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