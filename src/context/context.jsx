import React, { createContext, useState } from "react";
import runChat from "../config/DronzerApi";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [resultData, setResultData] = useState("");
  const [loding, setLoding] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);

  let newChat = () => {
    setLoding(true);
    setShowResult(false);
  };

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async (prompt) => {
    setResultData(" ");
    setLoding(true);

    let response = "";
    if (prompt !== undefined) {
      response = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await runChat(input);
    }

    setShowResult(true);

    setInput("");
    // Call runChat with the input

    let responseArray = response.split("**");
    let newResponse = " ";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 === 0) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      let nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoding(false);
  };

  const contextValue = {
    onSent,
    input,
    setInput,
    setResultData,
    showResult,
    loding,
    resultData,
    recentPrompt,
    setLoding,
    prevPrompt,
    setRecentPrompt,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {/* Use props.children instead of probs.child */}
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
