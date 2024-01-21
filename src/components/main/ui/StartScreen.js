import useQuizContext from "../../../custom-hooks/useQuizContext";

export default function StartScreen() {
  const { numOfQuestions, dispatchFn } = useQuizContext();

  return (
    <div className="start">
      <h2>Welcome to ReactWhiz</h2>
      <h3>{numOfQuestions} questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatchFn({ type: "start" })}
      >
        let's start
      </button>
    </div>
  );
}
