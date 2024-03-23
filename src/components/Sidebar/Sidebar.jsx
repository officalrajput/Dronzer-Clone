import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Sidebar.css";
import { Context } from "../../context/context";

const Sidebar = () => {
  const [extend, setExtend] = useState(false);
  const { prevPrompt,onSent,setRecentPrompt,newChat } = useContext(Context);

  const loadPrompt= async (prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt);
  }

  return (
    <div onClick={() => setExtend((prev) => !prev)} className="sidebar">
      <div className="top">
        <img className="menu" src={assets.menu_icon} />
        <div onClick={()=>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extend ? <p>New Chat</p> : null}
        </div>
        {extend ? (
          <div className="recent">
            <p className="recent-tittle">Recent</p>
            {prevPrompt.map((item, index) => {
              return (
                <div onClick={()=>loadPrompt()} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p key={index}>{item.slice(0,18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extend ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extend ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extend ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
