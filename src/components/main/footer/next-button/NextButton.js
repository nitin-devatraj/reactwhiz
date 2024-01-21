import useQuizContext from "../../../../custom-hooks/useQuizContext";

export default function NextButton() {
  const { dispatchFn, answer, index, numOfQuestions } = useQuizContext();

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
