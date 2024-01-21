import { createContext, useEffect, useReducer } from "react";

export const QuizContext = createContext();

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
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
      const SEC_PER_QUESTION = 30;
      return {
        ...currState,
        status: "active",
        secondsRemaining: currState.questions.length * SEC_PER_QUESTION,
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

    case "tick":
      return {
        ...currState,
        secondsRemaining: currState.secondsRemaining - 1,
        status:
          currState.secondsRemaining === 0 ? "finished" : currState.status,
      };

    default:
      throw new Error("unknown action type");
  }
}

export default function QuizContextProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatchFn,
  ] = useReducer(reducerFn, initialState);

  const numOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatchFn({ type: "dataReceived", payload: data }))
      .catch(() => dispatchFn({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numOfQuestions,
        maxPossiblePoints,
        dispatchFn,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
