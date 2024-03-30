import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Ex.css';

const Messenger = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Sabbir', type:"img", text: `http://localhost:8000/media/d.png`, timestamp: '10:00 AM' },
    { id: 2, sender: 'Nusrat', type:"text", text: 'Hi there!', timestamp: '10:05 AM' },
    { id: 3, sender: 'Opy',  type:"text", text: 'How are you?', timestamp: '10:10 AM' },
    { id: 4, sender: 'Amran',  type:"img", text: `http://localhost:8000/media/d.png`, timestamp: '10:15 AM' },
    { id: 5, sender: 'Arjun',  type:"text", text: 'What are you up to?', timestamp: '10:20 AM' },
    { id: 6, sender: 'Arjun',  type:"text", text: 'Just saying hi.', timestamp: '10:25 AM' },
    { id: 7, sender: 'Amran',  type:"img", text: `http://localhost:8000/media/d.png`, timestamp: '10:30 AM' },
    { id: 8, sender: 'Sabbir', type:"img", text: `http://localhost:8000/media/d.png`, timestamp: '10:35 AM' },
    { id: 9, sender: 'Nusrat', type:"text", text: 'How have you been?', timestamp: '10:40 AM' },
    { id: 10, sender: 'Nusrat', type:"img", text: `http://localhost:8000/media/d.png`, timestamp: '10:45 AM' },
    { id: 11, sender: 'Sabbir', type:"text", text: 'Not much, just relaxing.', timestamp: '10:50 AM' },
    { id: 12, sender: 'Sabbir', type:"img", text: `http://localhost:8000/media/d.png`, timestamp: '10:55 AM' },
    { id: 13, sender: 'Sabbir',  type:"text", text: 'I need a vacation!', timestamp: '11:00 AM' },
    { id: 14, sender: 'Opy',  type:"text", text: 'Me too, let\'s plan something.', timestamp: '11:05 AM' },
    { id: 15, sender: 'Opy',  type:"text", text: 'Count me in!', timestamp: '11:10 AM' },
    { id: 16, sender: 'Arjun',  type:"text", text: 'Sounds like a plan.', timestamp: '11:15 AM' },
    { id: 17, sender: 'Arjun',  type:"text", text: 'Great, let\'s discuss more later.', timestamp: '11:20 AM' },
    { id: 18, sender: 'Nusrat',  type:"text", text: 'Absolutely!', timestamp: '11:25 AM' },
    { id: 19, sender: 'Nusrat', type:"text", text: 'Looking forward to it.', timestamp: '11:30 AM' },
    { id: 20, sender: 'Opy',  type:"img", text: `http://localhost:8000/media/d.png`, timestamp: '11:35 AM' },
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
    const timestampOptions = { hour: 'numeric', minute: 'numeric' };
    const timestamp = new Date().toLocaleTimeString([], timestampOptions);
  
    const newMsg = {
      id: messages.length + 1,
      sender: 'Sabbir', // Assuming user1 is the current user
      text: newMessage.trim(),
      type: "text",
      timestamp: timestamp // Add timestamp
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const filteredMessages = selectedUser ? messages.filter(msg => msg.sender === selectedUser || msg.sender === 'Sabbir') : messages;

  return (
    <div className="container-fluid">
      <div className="row" style={{ height: '100vh' }}>
        <div className="col-3 border-right">
          <h2>User List</h2>
          <ul className="list-group">
            <li className="list-group-item" onClick={() => setSelectedUser('Nusrat')}>Nusrat</li>
            <li className="list-group-item" onClick={() => setSelectedUser('Arjun')}>Arjun</li>
            <li className="list-group-item" onClick={() => setSelectedUser('Amran')}>Amran</li>
            <li className="list-group-item" onClick={() => setSelectedUser('Opy')}>Opy</li>
            {/* Add more user list items here */}
          </ul>
        </div>
        <div className="col-9">
        <h2> <img className="rounded" src={`http://localhost:8000/media/d.png`} alt="img" style={{ width: '40px', height: '40px' }}/> {selectedUser}</h2>
          <hr className="mb-4"/>
          <div ref={messageBoxRef} className="overflow-auto" style={{ height: '70vh' }}>
            {filteredMessages.map(msg => (
              <div key={msg.id} className={`mb-2 ${msg.sender === 'Sabbir' ? 'items-align-right' : 'items-align-left'}`}>
                <div className={`d-inline-block p-2 rounded ${msg.sender === 'Sabbir' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                {msg.type === "text" ? (
      <>
        <p>{msg.text}</p>
      </>
    ) : (
      <>
        <img src={msg.text} alt="img" style={{ width: '100px', height: '100px' }} />
      </>
    )}
            <p className="text-muted text-small"><span>{msg.timestamp}</span></p> {/* Display timestamp */}


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
