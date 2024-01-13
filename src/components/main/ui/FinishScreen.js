export default function FinishScreen({
  points,
  maxPossiblePoints,
  highscore,
  dispatchFn,
}) {
  const percentage = Math.ceil((points / maxPossiblePoints) * 100);
  let emoji;
  if (percentage === 100) emoji = "🏅";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage <= 80) emoji = "😇";
  if (percentage >= 0 && percentage <= 50) emoji = "😐";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> you scored {points} out of {maxPossiblePoints}{" "}
        points ({percentage}%)
      </p>
      <p className="highscore">(Highscore : {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatchFn({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
