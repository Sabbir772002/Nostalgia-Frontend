import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chat.css';
import Nav from '../../Components/Navigation/Nav';

const Chat = () => {
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='interface'>
      <Nav 
        search={search}
        setSearch={setSearch}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />

      <div className="bot mt-2" style={{ position: 'fixed', marginBottom: '20px'}}>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card chat-app">
              <div id="plist" className="people-list">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" style={{height: '38px'}}><i className="fa fa-search" style={{fontSize: '16px'}}></i></span>
                  </div>
                  <input type="text" className="form-control" style={{height: '38px'}} placeholder="Search..."/>
                </div>
                <ul className="list-unstyled chat-list mt-2 mb-0" style={{ maxHeight: '500px', overflowY: 'auto', marginBottom:"20px" }}>
                  <li className="clearfix">
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
                    <div className="about">
                      <div className="name">Vincent Porter</div>
                      <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>                                            
                    </div>
                  </li>
                  <li className="clearfix active">
                    <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar"/>
                    <div className="about">
                      <div className="name">Aiden Chavez</div>
                      <div className="status"> <i className="fa fa-circle online"></i> online </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="chat">
                <div className="chat-header clearfix">
                  <div className="row">
                    <div className="col-lg-6">
                      <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar"/>
                      <div className="chat-about">
                        <h6 className="m-b-0">Aiden Chavez</h6>
                        <small>Last seen: 2 hours ago</small>
                      </div>
                    </div>
                    <div className="col-lg-6 box-right">
                      <button type="button" className="btn btn-outline-secondary"><i className="fa fa-camera"></i></button>
                      <button type="button" className="btn btn-outline-primary"><i className="fa fa-image"></i></button>
                      <button type="button" className="btn btn-outline-info"><i className="fa fa-cogs"></i></button>
                      <button type="button" className="btn btn-outline-warning"><i className="fa fa-question"></i></button>
                    </div>
                  </div>
                </div>
                <div className="chat-history">
                  <ul className="m-b-0" style={{ maxHeight: '370px', overflowY: 'auto' }}>
                    <li className="clearfix">
                      <div className="message-data box-right">
                        <span className="message-data-time">10:10 AM, Today</span>
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar"/>
                      </div>
                      <div className="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>
                    </li>
                  </ul>
                </div>
                <div className="chat-message clearfix">
                  <div className="input-group mb-0">
                    <div className="input-group-prepend">
                      <span className="input-group-text" style={{height: '38px'}}><i className="fa fa-send" style={{fontSize: '16px'}}></i></span>
                    </div>
                    <input type="text" className="form-control" style={{height: '38px'}} placeholder="Enter text here..."/>                                    
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
