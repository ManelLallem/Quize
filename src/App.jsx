import React from "react";
import Quize from "./Components/Quize";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"

function App(props) {
  let [mydata, setData] = useState(null);
  let [startFlag, setStartFlag] = useState(true);
  const getData = async () => {
    console.log("you clicked");
    const response = await axios.get(
      "https://opentdb.com/api.php?amount=10&type=multiple"
    );
    setData(response.data);
    mydata ? console.log(mydata) : "";
    setStartFlag(false);
  };

  return (
    <div id="container">
      {startFlag ? (
        <div id="landing-page">
        <h1>Trivia Quize</h1>
        <p>Test your knowldge with 10 different questions</p>
        <input id="start-btn" type="button" value="Start Quize" onClick={() => getData()} /></div>
      ) : mydata ? (
        <Quize mydata={mydata} setStartFlag={setStartFlag} />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
