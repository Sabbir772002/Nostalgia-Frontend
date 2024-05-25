import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Nav from '../../Components/Navigation/Nav';
import { useLocation, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chat.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    const location = useLocation();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [done, setdone] = useState(false);

    useEffect(() => {
        if (fnd && !done) {
            console.log("fnd alreadt set   "+fnd);
            setfd(fnd);
            findname(fnd);
            msgbox();
           
        }

    }, [fnd]);
    // console.log(fnd);
    const [users, setUsers] = useState([]);
    const [userbox, setUserbox] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [search, setSearch] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const socket = useSocket('http://localhost:5000');
    const finduserlist = async () => {
        axios.get('http://localhost:5000/api/userbox/' + userData.username)
            .then(response => {
                const userList = response.data.map((username, index) => ({
                    id: index + 1,
                    name: username.toLowerCase(), // Convert the name to lowercase
                }));
                
                // Remove duplicates by converting the array to a Set and back to an array
                const uniqueUserList = Array.from(new Set(userList.map(user => user.name))).map(name => {
                    // Find the first occurrence of the name in the original list and get its ID
                    const id = userList.find(user => user.name === name).id;
                    return { id, name };
                });
                
                setUsers(uniqueUserList);
                if (uniqueUserList.length > 0 && (fnd == "" || fnd == null || fnd == undefined) && !done){
                    console.log(fnd);
                    console.log("set of userlists")
                    setfd(uniqueUserList[0].name);
                    findname(uniqueUserList[0].name);
                }
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
        const fetchUserImages = async () => {
            const userImages = await Promise.all(users.map(async (user) => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/profile/${user.name}`, {
                        params: {
                            username: user.name,
                            user: userData.username
                        }
                    });
                    return response.data.pp;
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    return null;
                }
            }));
    
            const updatedUserBox = users.map((user, index) => ({
                id: user.id,
                name: user.name,
                img: userImages[index]
            }));
            setUserbox(updatedUserBox);
        };
    
        if (users.length > 0) {
            fetchUserImages();
        }
        
    };
    
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

            if (!messageExists && (message.sender === userData.username ||(message.sender==fd && message.receiver === userData.username))) {
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
                receiver: fnd,
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
        if (fnd && !done) {
            msgbox();
            findname(fnd);
        } 
    }, [fd]);
    
    const [fnddata, setfndData] = useState("");
    const [fndname, setfndName] = useState("");
    const findname = (name) => {
        // console.log(name);
        axios.get(`http://127.0.0.1:8000/profile/${name}`, {
            params: {
                username: name,
                user: userData.username
                }
        }).then(response => {
            console.log('Box of User Data:', response.data);
            setfndData(response.data);
            setfndName(response.data.first_name + " " + response.data.last_name);
            console.log(response.data.first_name + " " + response.data.last_name);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    };

  const handleNameClick = (name) => {
        setdone(true);
        setfd(name);
        findname(name);
        msgbox();

        console.log("msg box of : "+name);
    }; 
    useEffect(() => {
        finduserlist();
    }, [fndname,fd,userData.username,messages]);

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
                                {userbox.map((user) => (
                                    <li key={user.id} className='clearfix'  onClick={() => handleNameClick(user.name)}>
                                        <img src={`http://localhost:8000/${user.img}`} alt='avatar' className="circle" style={{ width: '50px', height: '50px' }} />
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
                                        <img src={`http://localhost:8000/${fnddata.pp}`} alt='avatar' className="circle" style={{ width: '50px', height: '50px' }} />
                                        </a>
                                        <div className='chat-about'>
                                        <Link to={`/profile/${fd}`} className="text-dark">
                                            <h6 className='m-b-0'>{fndname}</h6>
                                            <small>Last seen: 2 hours ago</small>
                                            </Link>
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
                                                    <img src={`http://localhost:8000/${userData.p_image}`} alt="User" className="circle" style={{ width: '50px', height: '50px' }} />
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