import React, { useState } from "react";
import AuthRequired from "../../Components/auth/AuthRequired";
import ChatBody from "../../Components/chatbody/ChatBody";
import Sidebar from "../../Components/sidebar/sidebar";

const HomeScreen = () => {
  const [currentChattingMember, setCurrentChattingMember] = useState({});
  const [onlineUserList, setOnlineUserList] = useState([]);

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <div className="container-fluid">
          <div className="row g-0">
            <Sidebar
              setCurrentChattingMember={setCurrentChattingMember}
              onlineUserList={onlineUserList}
              
            />
            <ChatBody
              setOnlineUserList={setOnlineUserList}
              currentChattingMember={currentChattingMember}
             
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthRequired(HomeScreen);
