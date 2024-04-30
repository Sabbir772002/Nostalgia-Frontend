// import React from 'react';
// import { useState } from 'react';

// import img1 from "../../assets/Post Images/img1.jpg";
// import img2 from "../../assets/Post Images/img2.jpg";
// import img3 from "../../assets/Post Images/img3.jpg";
// import img4 from "../../assets/Post Images/img4.jpg";
// import img5 from "../../assets/Post Images/img5.jpg";
// import img6 from "../../assets/Post Images/img6.jpg";
// import { Container, Row, Col, Card, InputGroup, FormControl, ListGroup, Image, Button } from 'react-bootstrap';
// import { FaSearch, FaCamera, FaImage, FaCogs, FaQuestion, FaCircle } from 'react-icons/fa';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Chat.css';
// import Nav from '../../Components/Navigation/Nav';
// import { useLocation } from 'react-router-dom';
// const Chat = () => {
//   const location = useLocation();
//   //const userData = JSON.parse(new URLSearchParams(location.search).get('userData'));
//   const userData= JSON.parse(localStorage.getItem('userData'));

//   const [body,setBody] = useState("");
//   const [importFile,setImportFile] = useState("");

//   const [search,setSearch] = useState("");
//   const [following,setFollowing] = useState("");
//   const [showMenu,setShowMenu] = useState(false);
//   const [images,setImages] =  useState(null);

//   return (
//     <div className='interface'>
//       <Nav 
//         search={search}
//         setSearch={setSearch}
//         showMenu={showMenu}
//         setShowMenu={setShowMenu}
//       />

// <div className="bot mt-2" style={{ position: 'fixed', marginBottom: '20px'}}>
//   <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
// <div class="row clearfix">
//     <div class="col-lg-12">
//         <div class="card chat-app">
//             <div id="plist" class="people-list">
//             <div className="input-group">
//                 <div className="input-group-prepend">
//                     <span className="input-group-text" style={{height: '38px'}}><i className="fa fa-search" style={{fontSize: '16px'}}></i></span>
//                 </div>
//                 <input type="text" className="form-control" style={{height: '38px'}} placeholder="Search..."/>
//             </div>
//                 <ul class="list-unstyled chat-list mt-2 mb-0" style={{ maxHeight: '500px', overflowY: 'auto', marginBottom:"20px" }}>
//                 <li class="clearfix">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
//                         <div class="about">
//                             <div class="name">Vincent Porter</div>
//                             <div class="status"> <i class="fa fa-circle offline"></i> left 7 mins ago </div>                                            
//                         </div>
//                     </li>  <li class="clearfix">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
//                         <div class="about">
//                             <div class="name">Vincent Porter</div>
//                             <div class="status"> <i class="fa fa-circle offline"></i> left 7 mins ago </div>                                            
//                         </div>
//                     </li>  <li class="clearfix">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
//                         <div class="about">
//                             <div class="name">Vincent Porter</div>
//                             <div class="status"> <i class="fa fa-circle offline"></i> left 7 mins ago </div>                                            
//                         </div>
//                     </li>  <li class="clearfix">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
//                         <div class="about">
//                             <div class="name">Vincent Porter</div>
//                             <div class="status"> <i class="fa fa-circle offline"></i> left 7 mins ago </div>                                            
//                         </div>
//                     </li>  <li class="clearfix">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
//                         <div class="about">
//                             <div class="name">Vincent Porter</div>
//                             <div class="status"> <i class="fa fa-circle offline"></i> left 7 mins ago </div>                                            
//                         </div>
//                     </li>  <li class="clearfix">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
//                         <div class="about">
//                             <div class="name">Vincent Porter</div>
//                             <div class="status"> <i class="fa fa-circle offline"></i> left 7 mins ago </div>                                            
//                         </div>
//                     </li>  <li class="clearfix">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
//                         <div class="about">
//                             <div class="name">Vincent Porter</div>
//                             <div class="status"> <i class="fa fa-circle offline"></i> left 7 mins ago </div>                                            
//                         </div>
//                     </li>
//                     <li class="clearfix active">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar"/>
//                         <div class="about">
//                             <div class="name">Aiden Chavez</div>
//                             <div class="status"> <i class="fa fa-circle online"></i> online </div>
//                         </div>
//                     </li>
//                     <li class="clearfix">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar"/>
//                         <div class="about">
//                             <div class="name">Mike Thomas</div>
//                             <div class="status"> <i class="fa fa-circle online"></i> online </div>
//                         </div>
//                     </li>                                    
//                     <li class="clearfix">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar"/>
//                         <div class="about">
//                             <div class="name">Christian Kelly</div>
//                             <div class="status"> <i class="fa fa-circle offline"></i> left 10 hours ago </div>
//                         </div>
//                     </li>
//                     <li class="clearfix">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar8.png" alt="avatar"/>
//                         <div class="about">
//                             <div class="name">Monica Ward</div>
//                             <div class="status"> <i class="fa fa-circle online"></i> online </div>
//                         </div>
//                     </li>
//                     <li class="clearfix">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar"/>
//                         <div class="about">
//                             <div class="name">Dean Henry</div>
//                             <div class="status"> <i class="fa fa-circle offline"></i> offline since Oct 28 </div>
//                         </div>
//                     </li>
//                 </ul>
//             </div>
//             <div class="chat">
//                 <div class="chat-header clearfix">
//                     <div class="row">
//                         <div class="col-lg-6">
//                             <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
//                                 <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar"/>
//                             </a>
//                             <div class="chat-about">
//                                 <h6 class="m-b-0">Aiden Chavez</h6>
//                                 <small>Last seen: 2 hours ago</small>
//                             </div>
//                         </div>
//                         <div class="col-lg-6 box-right">
//                               <a href="javascript:void(0);" class="btn btn-outline-secondary"><i class="fa fa-camera"></i></a>
//                               <a href="javascript:void(0);" class="btn btn-outline-primary"><i class="fa fa-image"></i></a>
//                               <a href="javascript:void(0);" class="btn btn-outline-info"><i class="fa fa-cogs"></i></a>
//                               <a href="javascript:void(0);" class="btn btn-outline-warning"><i class="fa fa-question"></i></a>
//                           </div>


//                     </div>
//                 </div>
//                 <div class="chat-history">
//                     <ul class="m-b-0" style={{ maxHeight: '370px', overflowY: 'auto' }}>
//                         <li class="clearfix">
//                             <div class="message-data box-right">
//                                 <span class="message-data-time">10:10 AM, Today</span>
//                                 <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar"/>
//                             </div>
//                             <div class="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>
//                         </li>
//                         <li class="clearfix">
//                             <div class="message-data">
//                                 <span class="message-data-time">10:12 AM, Today</span>
//                             </div>
//                             <div class="message my-message">Are we meeting today?</div>                                    
//                         </li>                               
//                         <li class="clearfix">
//                             <div class="message-data">
//                                 <span class="message-data-time">10:15 AM, Today</span>
//                             </div>
//                             <div class="message my-message">Project has been already finished and I have results to show you.</div>
//                         </li>  <li class="clearfix">
//                             <div class="message-data">
//                                 <span class="message-data-time">10:15 AM, Today</span>
//                             </div>
//                             <div class="message my-message">Project has been already finished and I have results to show you.</div>
//                         </li>  <li class="clearfix">
//                             <div class="message-data">
//                                 <span class="message-data-time">10:15 AM, Today</span>
//                             </div>
//                             <div class="message my-message">Project has been already finished and I have results to show you.</div>
//                         </li>  <li class="clearfix">
//                             <div class="message-data">
//                                 <span class="message-data-time">10:15 AM, Today</span>
//                             </div>
//                             <div class="message my-message">Project has been already finished and I have results to show you.</div>
//                         </li>
//                     </ul>
//                 </div>
//                 <div class="chat-message clearfix">
//                 <div className="input-group mb-0">
//                       <div className="input-group-prepend">
//                           <span className="input-group-text" style={{height: '38px'}}><i className="fa fa-send" style={{fontSize: '16px'}}></i></span>
//                       </div>
//                       <input type="text" className="form-control" style={{height: '38px'}} placeholder="Enter text here..."/>                                    
//                   </div>
//             </div>
//             </div>
//         </div>
//     </div>
// </div>
// </div>
// </div>

//   );
// }

// export default Chat;
