export default function Progress({
  index,
  numOfQuestions,
  points,
  maxPossiblePoints,
}) {
  return (
    <div className="progress">
      <progress max={numOfQuestions} value={index + 1} />
      <p>
        Question <strong>{index + 1}</strong> / {numOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </div>
  );
}
