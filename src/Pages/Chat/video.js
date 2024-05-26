// import React, { useState, useEffect } from 'react';
// import Peer from 'peerjs';
// import io from 'socket.io-client';

// const Vid = ({ roomId }) => {
//   const [selfStream, setSelfStream] = useState(null);
//   const [peers, setPeers] = useState({});
//   const [myPeer, setMyPeer] = useState(null);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = io('https://localhost:3001');
//     setSocket(newSocket);

//     const newPeer = new Peer(undefined, {
//       host: 'peer-server-video-chat.herokuapp.com',
//       secure: true
//     });
//     setMyPeer(newPeer);

//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then(stream => {
//         setSelfStream(stream);
//         addSelfVideoStream(stream);

//         newPeer.on('call', call => {
//           call.answer(stream);
//           call.on('stream', userVideoStream => {
//             addVideoStream(userVideoStream);
//           });
//         });

//         newSocket.on('user-connected', userId => {
//           connectToNewUser(userId, stream);
//         });
//       });

//     newPeer.on('open', id => {
//       newSocket.emit('join-room', roomId, id);
//     });

//     newSocket.on('user-disconnected', userId => {
//       if (peers[userId]) {
//         peers[userId].close();
//       }
//     });

//     return () => {
//       newSocket.disconnect();
//       newPeer.disconnect();
//     };
//   }, []);

//   const addSelfVideoStream = (stream) => {
//     const video = document.getElementById('videoSelfElement');
//     video.srcObject = stream;
//     video.addEventListener('loadedmetadata', () => {
//       video.play();
//     });
//   };

//   const connectToNewUser = (userId, stream) => {
//     const call = myPeer.call(userId, stream);
//     const video = document.createElement('video');
//     call.on('stream', userVideoStream => {
//       addVideoStream(userVideoStream);
//     });
//     call.on('close', () => {
//       video.remove();
//     });
//     setPeers(prevPeers => ({ ...prevPeers, [userId]: call }));
//   };

//   const addVideoStream = (stream) => {
//     const video = document.createElement('video');
//     video.srcObject = stream;
//     video.addEventListener('loadedmetadata', () => {
//       video.play();
//     });
//     document.getElementById('video-grid').appendChild(video);
//   };

//   const handleHideVideo = () => {
//     const selfVideoElement = document.getElementById("videoSelfElement");
//     if (selfVideoElement.classList.contains("hide")) {
//       selfVideoElement.classList.remove("hide");
//       document.getElementById("hide-video").classList.add("fa-eye");
//       document.getElementById("hide-video").classList.remove("fa-eye-slash");
//     } else {
//       selfVideoElement.classList.add("hide");
//       document.getElementById("hide-video").classList.remove("fa-eye");
//       document.getElementById("hide-video").classList.add("fa-eye-slash");
//     }
//   };

//   const handleToggleAudio = () => {
//     const userVideoControls = document.getElementById('videoElement');
//     const audioIcon = document.getElementById("off-volume");
//     if (userVideoControls.volume !== 1) {
//       userVideoControls.volume = 1;
//       audioIcon.classList.remove("fa-volume-off");
//       audioIcon.classList.add("fa-volume-up");
//     } else {
//       userVideoControls.volume = 0;
//       audioIcon.classList.add("fa-volume-off");
//       audioIcon.classList.remove("fa-volume-up");
//     }
//   };

//   const handleToggleMute = () => {
//     const selfVideoControls = document.getElementById('videoSelfElement');
//     const micIcon = document.getElementById("off-mic");
//     selfVideoControls.muted = !selfVideoControls.muted;
//     if (selfVideoControls.muted) {
//       micIcon.classList.add("fa-microphone-slash");
//       micIcon.classList.remove("fa-microphone");
//     } else {
//       micIcon.classList.remove("fa-microphone-slash");
//       micIcon.classList.add("fa-microphone");
//     }
//   };

//   const handleToggleCamera = () => {
//     const selfVideoControls = document.getElementById('videoSelfElement');
//     const cameraIcon = document.getElementById("off-camera");
//     if (selfVideoControls.paused) {
//       selfVideoControls.play();
//       cameraIcon.classList.remove("icon-visiblity");
//     } else {
//       selfVideoControls.pause();
//       cameraIcon.classList.add("icon-visiblity");
//     }
//   };

//   const handleCancelCall = () => {
//     window.location.href = "/";
//   };

//   return (
//     <div>
//       <div id="video-grid"></div>
//       <div id="controls">
//         {/* Control buttons */}
//         <div className="mid-control">
//           <div id="off-volume" className="control-icon" onClick={handleToggleAudio}>
//             <i className="fa fa-volume-up"></i>
//           </div>
//           <div id="off-mic" className="control-icon" onClick={handleToggleMute}>
//             <i className="fa fa-microphone"></i>
//           </div>
//           <div id="off-camera" className="control-icon" onClick={handleToggleCamera}>
//             <i className="fa fa-video"></i>
//           </div>
//         </div>
//         <div className="right-control">
//           <div id="hide-video" className="control-icon" onClick={handleHideVideo}>
//             <i className="fa fa-eye"></i>
//           </div>
//           <div id="cancel-call" className="control-icon" onClick={handleCancelCall}>
//             <i className="fa fa-phone"></i>
//           </div>
//         </div>
//       </div>
//       <div className="self-video">
//         <video id="videoSelfElement" autoPlay muted></video>
//       </div>
//     </div>
//   );
// };

// export default Vid;
