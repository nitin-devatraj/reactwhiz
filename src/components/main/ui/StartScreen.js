export default function StartScreen({ numOfQuestions, dispatchFn }) {
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
