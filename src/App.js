import { useEffect, useReducer } from "react";
import Header from "./components/header/Header";
import Main from "./components/main/Main";

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

    default:
      throw new Error("unknown action type");
  }
}

export default function App() {
  const [state, dispatchFn] = useReducer(reducerFn, initialState);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatchFn({ type: "dataReceived", payload: data }))
      .catch((err) => console.error("Error occured while fetching questions"));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Questions</p>
      </Main>
    </div>
  );
}
