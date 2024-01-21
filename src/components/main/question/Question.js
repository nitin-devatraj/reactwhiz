import useQuizContext from "../../../custom-hooks/useQuizContext";
import Options from "./options/Options";

export default function Question() {
  const { questions, dispatchFn, answer, index } = useQuizContext();
  const { question, options, correctOption } = questions[index];
  return (
    <div>
      <h4>{question}</h4>
      <Options
        options={options}
        dispatchFn={dispatchFn}
        answer={answer}
        correctOption={correctOption}
      />
    </div>
  );
}
