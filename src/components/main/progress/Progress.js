import useQuizContext from "../../../custom-hooks/useQuizContext";

export default function Progress() {
  const { index, numOfQuestions, points, maxPossiblePoints } = useQuizContext();
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
