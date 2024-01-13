import { useEffect, useReducer } from "react";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Loader from "./components/main/ui/Loader";
import Error from "./components/main/ui/Error";
import StartScreen from "./components/main/ui/StartScreen";
import Question from "./components/main/question/Question";
import NextButton from "./components/main/ui/NextButton";
import Progress from "./components/main/progress/Progress";
import FinishScreen from "./components/main/ui/FinishScreen";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducerFn(currState, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...currState,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...currState,
        status: "error",
      };

    case "start":
      return {
        ...currState,
        status: "active",
      };

    case "newAnswer":
      const { correctOption, points } = currState.questions[currState.index];
      return {
        ...currState,
        answer: action.payload,
        points:
          action.payload === correctOption
            ? currState.points + points
            : currState.points,
      };

    case "nextQuestion":
      return {
        ...currState,
        index: currState.index + 1,
        answer: null,
      };

    case "finished":
      return {
        ...currState,
        status: "finished",
        highscore:
          currState.points > currState.highscore
            ? currState.points
            : currState.highscore,
      };

    case "restart":
      return {
        ...initialState,
        questions: currState.questions,
        status: "ready",
      };

    default:
      throw new Error("unknown action type");
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatchFn] =
    useReducer(reducerFn, initialState);

  const numOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatchFn({ type: "dataReceived", payload: data }))
      .catch(() => dispatchFn({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numOfQuestions={numOfQuestions}
            dispatchFn={dispatchFn}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numOfQuestions={numOfQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              currQuestion={questions[index]}
              dispatchFn={dispatchFn}
              answer={answer}
            />
            <NextButton
              dispatchFn={dispatchFn}
              answer={answer}
              index={index}
              numOfQuestions={numOfQuestions}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatchFn={dispatchFn}
          />
        )}
      </Main>
    </div>
  );
}
