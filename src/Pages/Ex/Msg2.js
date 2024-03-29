import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Ex.css';

const Messenger = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Sabbir', type:"img",text: `http://localhost:8000/media/d.png`  },
    { id: 2, sender: 'Nusrat', type:"text",text: 'Hi there!' },
    { id: 3, sender: 'Opy',  type:"text",text: 'How are you?' },
    { id: 4, sender: 'Amran',  type:"img",text: `http://localhost:8000/media/d.png`  },
    { id: 5, sender: 'Arjun',  type:"text",text: 'What are you up to?' },
    { id: 6, sender: 'Arjun',  type:"text",text: 'Just saying hi.' },
    { id: 7, sender: 'Amran',  type:"img", text: `http://localhost:8000/media/d.png` },
    { id: 8, sender: 'Sabbir', type:"img", text: `http://localhost:8000/media/d.png`  },
    { id: 9, sender: 'Nusrat', type:"text", text: 'How have you been?' },
    { id: 10, sender: 'Nusrat', type:"img", text: `http://localhost:8000/media/d.png`  },
    { id: 11, sender: 'Sabbir', type:"text", text: 'Not much, just relaxing.' },
    { id: 12, sender: 'Sabbir', type:"img", text: `http://localhost:8000/media/d.png`   },
    { id: 13, sender: 'Sabbir',  type:"text",text: 'I need a vacation!' },
    { id: 14, sender: 'Opy',  type:"text",text: 'Me too, let\'s plan something.' },
    { id: 15, sender: 'Opy',  type:"text",text: 'Count me in!' },
    { id: 16, sender: 'Arjun',  type:"text",text: 'Sounds like a plan.' },
    { id: 17, sender: 'Arjun',  type:"text",text: 'Great, let\'s discuss more later.' },
    { id: 18, sender: 'Nusrat',  type:"text",text: 'Absolutely!' },
    { id: 19, sender: 'Nusrat', type:"text", text: 'Looking forward to it.' },
    { id: 20, sender: 'Opy',  type:"img",text: `http://localhost:8000/media/d.png` },
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
      sender: 'Sabbir', // Assuming user1 is the current user
      text: newMessage.trim(),
      type: "text"
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
        <div className="col-8">
        <h2> <img className="rounded" src={`http://localhost:8000/media/d.png`  } alt="img" style={{ width: '40px', height: '40px' }}/> {selectedUser}</h2>
          <hr className="mb-4"/>
          <div ref={messageBoxRef} className="overflow-auto" style={{ height: '70vh' }}>
            {filteredMessages.map(msg => (
              <div key={msg.id} className={`mb-2 ${msg.sender === 'Sabbir' ? 'items-align-right' : 'items-align-left'}`}>
                 <div className={`d-inline-block p-2 rounded ${msg.sender === 'user1' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                  {msg.type === "text" ? msg.text : <img src={msg.text} alt="img" style={{ width: '100px', height: '100px' }} />}
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
