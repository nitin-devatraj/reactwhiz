export default function Options({
  options,
  dispatchFn,
  answer,
  correctOption,
}) {
  const hasAnswered = answer !== null;
  function handleOptionSelection(index) {
    dispatchFn({ type: "newAnswer", payload: index });
  }

  return (
    <div className="options">
      {options.map((option, index) => {
        const btnClasses = `btn btn-option ${
          index === answer ? "answer" : ""
        } ${
          hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""
        }`;

        return (
          <button
            className={btnClasses}
            key={option}
            disabled={hasAnswered}
            onClick={() => handleOptionSelection(index)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
