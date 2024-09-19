import React from "react";
import { useState } from "react";
import "./quize.css"

function Quize({ mydata, setStartFlag }) {
  let [progress, setProgress] = useState(0);
  let [question, setQestion] = useState(mydata.results[0].question);
  let [correct_answer, setAnswer] = useState(mydata.results[0].correct_answer);
  let [wrong_answers, setWronganswer] = useState(
    mydata.results[0].incorrect_answers
  );
  let [flag, setFlag] = useState(true);
  let [mychoices, setChoices] = useState(null);
  let [score, setScore] = useState(0);
  let [quizeFlag, setquizeFlag] = useState(true);

  let getChoices = () => {
    let choices = [correct_answer, ...wrong_answers];

    for (var i = choices.length - 1; i >= 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = choices[i];
      choices[i] = choices[j];
      choices[j] = temp;
    }
    setChoices(choices);
    setFlag(false);
  };
  if (flag) {
    getChoices();
  }
  let handleChoice = (choice) => {
    if (choice == correct_answer) {
      let temp = score + 1;
      setScore(temp);
    }

    if (progress < 10) {
      setProgress(progress + 1);
      let newProgress = progress;
      console.log(newProgress);
      setQestion(mydata.results[newProgress].question);
      setAnswer(mydata.results[newProgress].correct_answer);
      setWronganswer(mydata.results[newProgress].incorrect_answers);
      setFlag(true); // bug here can be fixed by insuring that this runs the last 
    } else {
      setquizeFlag(false);
    }
  };
  return (
    <>
      {" "}
      {quizeFlag ? (
        mychoices ? (
          <div id="quize">
            <p id="question"> <span id="qst">Question {progress+1} :</span> {question}</p>
            {mychoices.map((choice, index) => (
              <p className="choice" key={index} onClick={() => handleChoice(choice)}>
                {choice}
              </p>
            ))}
          </div>
        ) : (
          ""
        )
      ) : (
        <div id="score">
          <p> Your score is: {score/10*100} %</p>
          <input
            type="button"
            value="Take another quize "
            onClick={() => setStartFlag(true)}
          />
        </div>
      )}
    </>
  );
}

export default Quize;
