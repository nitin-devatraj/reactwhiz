export default function NextButton({ dispatchFn, answer }) {
  if (answer === null) return;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatchFn({ type: "nextQuestion" })}
    >
      Next Question
    </button>
  );
}
