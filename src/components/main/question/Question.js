import Options from "./options/Options";

export default function Question({ currQuestion, dispatchFn, answer }) {
  const { question, options, correctOption } = currQuestion;
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
