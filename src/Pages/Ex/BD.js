// import React, { useState, useEffect } from 'react';
// import { w3cwebsocket as W3CWebSocket } from "websocket";

// const client = new W3CWebSocket('ws://127.0.0.1:8001/ws/sabbir/');

// const ChatComponent = () => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');

//     useEffect(() => {
//         client.onopen = () => {
//             console.log('WebSocket Client Connected');
//         };
//         client.onmessage = (message) => {
//             const messageData = JSON.parse(message.data);
//             setMessages([...messages, messageData]);
//         };
//     }, [messages]);

//     const sendMessage = () => {
//         client.send(JSON.stringify({ message: newMessage }));
//         setNewMessage('');
//     };

//     return (
//         <div>
//             <div>
//                 {messages.map((msg, index) => (
//                     <div key={index}>
//                         <p>{msg.message}</p>
//                     </div>
//                 ))}
//             </div>
//             <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
//             <button onClick={sendMessage}>Send</button>
//         </div>
//     );
// };

// export default ChatComponent;
