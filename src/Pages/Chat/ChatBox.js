import React from 'react';
import { useState } from 'react';

import img1 from "../../assets/Post Images/img1.jpg";
import img2 from "../../assets/Post Images/img2.jpg";
import img3 from "../../assets/Post Images/img3.jpg";
import img4 from "../../assets/Post Images/img4.jpg";
import img5 from "../../assets/Post Images/img5.jpg";
import img6 from "../../assets/Post Images/img6.jpg";



import DPimg1 from "../../assets/DP/img1.jpg";
import DPimg2 from "../../assets/DP/img2.jpg";
import DPimg3 from "../../assets/DP/img3.jpg";
import DPimg4 from "../../assets/DP/img4.jpg";
import DPimg5 from "../../assets/DP/img5.jpg";
import DPimg6 from "../../assets/DP/img6.jpg";

import cover from "../../assets/Info-Dp/img-3.jpg";

import Cover1 from "../../assets/Friends-Cover/cover-1.jpg";
import Cover2 from "../../assets/Friends-Cover/cover-2.jpg";
import Cover3 from "../../assets/Friends-Cover/cover-3.jpg";
import Cover5 from "../../assets/Friends-Cover/cover-5.jpg";
import Cover7 from "../../assets/Friends-Cover/cover-7.jpg";
import Cover8 from "../../assets/Friends-Cover/cover-8.jpg";
import Cover9 from "../../assets/Friends-Cover/cover-9.jpg";

import Uimg1 from "../../assets/User-post/img1.jpg";
import Uimg2 from "../../assets/User-post/img2.jpg";
import Uimg3 from "../../assets/User-post/img3.jpg";


import "./Chat.css";


import { useLocation } from 'react-router-dom';

const Chat = () => {
  const location = useLocation();
  //const userData = JSON.parse(new URLSearchParams(location.search).get('userData'));
  const userData= JSON.parse(localStorage.getItem('userData'));

  const [body,setBody] = useState("");
  const [importFile,setImportFile] = useState("");

  const [search,setSearch] = useState("");
  const [following,setFollowing] = useState("");
  const [showMenu,setShowMenu] = useState(false);
  const [images,setImages] =  useState(null);

  return (
    <div className='interface'>
     

      <div className="chat">
        <div className="container">
          <div className="row clearfix">
            <div className="col-lg-12">
              <div className="card chat-app">
                <div id="plist" className="people-list">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fa fa-search"></i></span>
                    </div>
                    <input type="text" className="form-control" placeholder="Search..." />
                  </div>
                  <ul className="list-unstyled chat-list mt-2 mb-0">
                    <li className="clearfix">
                      <img src={img1} alt="avatar" />
                      <div className="about">
                        <div className="name">Vincent Porter</div>
                        <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>                                            
                      </div>
                    </li>
                    <li className="clearfix active">
                      <img src={img2} alt="avatar" />
                      <div className="about">
                        <div className="name">Aiden Chavez</div>
                        <div className="status"> <i className="fa fa-circle online"></i> online </div>
                      </div>
                    </li>
                    <li className="clearfix">
                      <img src={img3} alt="avatar" />
                      <div className="about">
                        <div className="name">Mike Thomas</div>
                        <div className="status"> <i className="fa fa-circle online"></i> online </div>
                      </div>
                    </li>                                    
                    <li className="clearfix">
                      <img src={img4} alt="avatar" />
                      <div className="about">
                        <div className="name">Christian Kelly</div>
                        <div className="status"> <i className="fa fa-circle offline"></i> left 10 hours ago </div>
                      </div>
                    </li>
                    <li className="clearfix">
                      <img src={img5} alt="avatar" />
                      <div className="about">
                        <div className="name">Monica Ward</div>
                        <div className="status"> <i className="fa fa-circle online"></i> online </div>
                      </div>
                    </li>
                    <li className="clearfix">
                      <img src={img6} alt="avatar" />
                      <div className="about">
                        <div className="name">Dean Henry</div>
                        <div className="status"> <i className="fa fa-circle offline"></i> offline since Oct 28 </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="chat-history">
                  <ul className="m-b-0">
                    <li className="clearfix">
                      <div className="message-data text-right">
                        <span className="message-data-time">10:10 AM, Today</span>
                        <img src={img6} alt="avatar" />
                      </div>
                      <div className="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>
                    </li>
                    <li className="clearfix">
                      <div className="message-data">
                        <span className="message-data-time">10:12 AM, Today</span>
                      </div>
                      <div className="message my-message">Are we meeting today?</div>                                    
                    </li>                               
                    <li className="clearfix">
                      <div className="message-data">
                        <span className="message-data-time">10:15 AM, Today</span>
                      </div>
                      <div className="message my-message">Project has been already finished and I have results to show you.</div>
                    </li>
                  </ul>
                </div>
                <div className="chat-message clearfix">
                  <div className="input-group mb-0">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fa fa-send"></i></span>
                    </div>
                    <input type="text" className="form-control" placeholder="Enter text here..." />                                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Chat;