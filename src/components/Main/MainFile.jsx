import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const MainFile = () => {
  const {
    onSent,
    input,
    setInput,
    recentPrompt,
    loding,
    resultData,
    showResult,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Dronzer</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello!! Dev</span>
              </p>
              <p>How Can I help You!!</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beutiful places for upcomming Road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>

              <div className="card">
                <p>Can you give me the idea of Road trip planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>

              <div className="card">
                <p>Brefiley sumrize the Concept of : urbun places</p>
                <img src={assets.message_icon} alt="" />
              </div>

              <div className="card">
                <p>Improve the readibily of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.Dronzer_icon} alt="" />
              {!loding ? (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              ) : (
                <div class="loader">
                  <hr />
                  <hr />
                  <hr />
                  <hr />
                  <hr />
                </div>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(event) => setInput(event.target.value)}
              value={input}
              type="text"
              name=""
              placeholder="Enter the prompt here.."
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" />:null}
            </div>
          </div>
          <p className="bottom-info">
            Dronzer May give inaccurate info, including about people,so double
            checks its response.your privacy And Dronzer Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainFile;
