import { useEffect } from "react";
import useQuizContext from "../../../../custom-hooks/useQuizContext";

export default function Timer() {
  const { dispatchFn, secondsRemaining } = useQuizContext();
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(() => dispatchFn({ type: "tick" }), 1000);
      return () => clearInterval(id);
    },
    [dispatchFn]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
