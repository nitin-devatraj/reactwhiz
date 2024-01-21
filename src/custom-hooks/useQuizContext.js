import { useContext } from "react";
import { QuizContext } from "../context/QuizContext";

export default function useQuizContext() {
  const value = useContext(QuizContext);
  if (value === undefined)
    throw new Error("QuizContext was used outside of QuizContextProvider");
  else return value;
}
