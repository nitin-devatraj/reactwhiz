export default function NextButton({
  dispatchFn,
  answer,
  index,
  numOfQuestions,
}) {
  if (answer === null) return;

  if (index < numOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatchFn({ type: "nextQuestion" })}
      >
        Next Question
      </button>
    );

  if (index === numOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatchFn({ type: "finished" })}
      >
        Finish
      </button>
    );
}
