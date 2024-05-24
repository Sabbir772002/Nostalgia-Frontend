import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Nav from '../../Components/Navigation/Nav';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chat.css';

const Chat = () => {
    const location = useLocation();
    const userData = JSON.parse(localStorage.getItem('userData'));

    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [search, setSearch] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const socket = io('http://localhost:4000');
    const [newfnd,setnewfnd]=useState("");


  
    useEffect(() => {
        const dummyUsers = [
            { id: 1, name: 'Vincent Porter' },
            { id: 2, name: 'Aiden Chavez' },
            { id: 3, name: 'Mike Thomas' },
            { id: 4, name: 'Christian Kelly' },
            { id: 5, name: 'Monica Ward' },
            { id: 6, name: 'Dean Henry' },
            { id: 11, name: 'Vincent Porter' },
            { id: 21, name: 'Aiden Chavez' },
            { id: 31, name: 'Mike Thomas' },
            { id: 41, name: 'Christian Kelly' },
            { id: 51, name: 'Monica Ward' },
            { id: 61, name: 'Dean Henry' }
        ];
        setUsers(dummyUsers);
        setnewfnd(dummyUsers[0].name);

    }, []);

    useEffect(() => {
        socket.emit('set username', userData.username);
        console.log(userData.username);
            socket.on('chat message', (message) => {
            console.log('New message received:', message);
            setMessages((prevMessages) => [...prevMessages, message]);
            
            const chatHistory = document.getElementById('chat-history');
            console.log('chatHistory:', chatHistory);
            if (chatHistory) {
                chatHistory.scrollTop = chatHistory.scrollHeight - chatHistory.clientHeight;
                console.log('Scrolled to bottom of chat history');
            } else {
                console.log('chat-history element not found');
            }
        });
    
        return () => {
            socket.disconnect();
        };
    }, []);
    

    const sendMessage = () => {
        if (newMessage.trim() !== '') {
            const message = {
                sender: userData.username,
                receiver:newfnd,
                content: newMessage,
                time: new Date().toLocaleTimeString()
            };
            socket.emit('set username', userData.username);
            socket.emit('chat message', message);
           // setMessages((prevMessages) => [...prevMessages, message]);
            setNewMessage('');
            const chatHistory = document.getElementById('chat-history');
            chatHistory.scrollTop = chatHistory.scrollHeight - chatHistory.clientHeight;
        }
    };
    
    const handleNameClick = (name) => {
        setnewfnd(name);
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
                                        <li key={index} className={message.sender === userData.username ? 'clearfix' : 'clearfix other'}>
                                            {message.sender != userData.username && (
                                                <div className='message-data box-right'>
                                                    <span className='message-data-time'>{message.time}</span>
                                                    <img src='https://bootdey.com/img/Content/avatar/avatar7.png' alt='avatar' />
                                                </div>
                                            )}
                                            <div className={message.sender === userData.username ? 'message my-message float-right' : 'message other-message'}>
                                                {message.content}
                                            </div>
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
