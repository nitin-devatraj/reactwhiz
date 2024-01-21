import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Loader from "./components/main/ui/Loader";
import Error from "./components/main/ui/Error";
import StartScreen from "./components/main/ui/StartScreen";
import Question from "./components/main/question/Question";
import Progress from "./components/main/progress/Progress";
import FinishScreen from "./components/main/ui/FinishScreen";
import Footer from "./components/main/footer/Footer";
import NextButton from "./components/main/footer/next-button/NextButton";
import Timer from "./components/main/footer/timer/Timer";
import useQuizContext from "./custom-hooks/useQuizContext";

export default function App() {
  const { status } = useQuizContext();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <NextButton />
              <Timer />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
