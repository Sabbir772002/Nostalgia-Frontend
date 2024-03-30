import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Ex.css';

const Messenger = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'user1', text: 'Hello!' },
    { id: 2, sender: 'user2', text: 'Hi there!' },
    { id: 3, sender: 'user3', text: 'How are you?' },
    { id: 4, sender: 'user4', text: 'I am good, thanks!' },
    { id: 5, sender: 'user5', text: 'What are you up to?' },
    { id: 6, sender: 'user1', text: 'Just saying hi.' },
    { id: 7, sender: 'user2', text: 'Good to see you!' },
    { id: 8, sender: 'user3', text: 'Long time no talk.' },
    { id: 9, sender: 'user4', text: 'How have you been?' },
    { id: 10, sender: 'user5', text: 'Got any plans for the weekend?' },
    { id: 11, sender: 'user1', text: 'Not much, just relaxing.' },
    { id: 12, sender: 'user2', text: 'Same here, it\'s been a busy week.' },
    { id: 13, sender: 'user3', text: 'I need a vacation!' },
    { id: 14, sender: 'user4', text: 'Me too, let\'s plan something.' },
    { id: 15, sender: 'user5', text: 'Count me in!' },
    { id: 16, sender: 'user1', text: 'Sounds like a plan.' },
    { id: 17, sender: 'user2', text: 'Great, let\'s discuss more later.' },
    { id: 18, sender: 'user3', text: 'Absolutely!' },
    { id: 19, sender: 'user4', text: 'Looking forward to it.' },
    { id: 20, sender: 'user5', text: 'Me too!' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const messageBoxRef = useRef(null);

  useEffect(() => {
    scrollToTop();
  }, [messages]);

  const scrollToTop = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  const handleSendMessage = () => {
    if (!selectedUser || newMessage.trim() === '') return;
    const newMsg = {
      id: messages.length + 1,
      sender: 'user1', // Assuming user1 is the current user
      text: newMessage.trim(),
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const filteredMessages = selectedUser ? messages.filter(msg => msg.sender === selectedUser || msg.sender === 'user1') : messages;

  return (
    <div className="container-fluid">
      <div className="row" style={{ height: '100vh' }}>
        <div className="col-3 border-right">
          <h2>User List</h2>
          <ul className="list-group">
            <li className="list-group-item" onClick={() => setSelectedUser('user2')}>User 2</li>
            <li className="list-group-item" onClick={() => setSelectedUser('user3')}>User 3</li>
            <li className="list-group-item" onClick={() => setSelectedUser('user4')}>User 4</li>
            <li className="list-group-item" onClick={() => setSelectedUser('user5')}>User 5</li>
            {/* Add more user list items here */}
          </ul>
        </div>
        <div className="col-8">
          <h2>Messages</h2>
          <hr className="mb-4"/>
          <div ref={messageBoxRef} className="overflow-auto" style={{ height: '70vh' }}>
            {filteredMessages.map(msg => (
              <div key={msg.id} className={`mb-2 ${msg.sender === 'user1' ? 'items-align-right' : 'items-align-left'}`}>
                 <div className={`d-inline-block p-2 rounded ${msg.sender === 'user1' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <div className="input-group-append">
              <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
