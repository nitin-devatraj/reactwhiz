import { useEffect, useReducer } from "react";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Loader from "./components/main/ui/Loader";
import Error from "./components/main/ui/Error";
import StartScreen from "./components/main/ui/StartScreen";
import Question from "./components/main/question/Question";

const initialState = {
  questions: [],
  status: "loading",
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

    default:
      throw new Error("unknown action type");
  }
}

export default function App() {
  const [{ questions, status }, dispatchFn] = useReducer(
    reducerFn,
    initialState
  );

  const numOfQuestions = questions.length;

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
        {status === "active" && <Question />}
      </Main>
    </div>
  );
}
