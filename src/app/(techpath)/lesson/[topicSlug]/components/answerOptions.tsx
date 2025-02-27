import { useEffect, useState } from "react";
import { Answer } from "../page";
import { addAnsweredQuestion, Question } from "@/redux/slices/lessonSlice";
import { useDispatch } from "react-redux";

type BaseQuestionProps = {
  answers: Answer[];
  activeQuestion: Question | null;
  handleNextQuestion: () => void;
};

type MatchPairsProps = BaseQuestionProps & {
  handleHasFinishedLesson: (
    finished: boolean,
    status: "success" | "failure" | null,
  ) => void;
};

type PairProps = {
  pair: Answer[] | [];
  isCorrect: boolean;
};

export function MultipleChoiceQuestion({
  answers,
  activeQuestion,
  handleNextQuestion,
}: BaseQuestionProps) {
  const dispatch = useDispatch();

  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [checkAnswer, setCheckAnswer] = useState<boolean | null>(null);

  const getButtonStyles = (answer: Answer) => {
    const isSelected = selectedAnswer?.id === answer.id;
    const isAnswered = checkAnswer !== null;
    const isCorrect = selectedAnswer?.text === correctAnswer;

    if (isSelected) {
      if (isAnswered) {
        return isCorrect
          ? "border-green-600 bg-green-600 text-white"
          : "border-red-600 bg-red-600 text-white";
      }
      return "border-blue bg-selected text-blue shadow-md";
    }
    return "border-border";
  };

  const handleCheckAnswer = () => {
    if (activeQuestion && selectedAnswer && correctAnswer) {
      const response = selectedAnswer.text === correctAnswer;
      setCheckAnswer(response);
      dispatch(
        addAnsweredQuestion({
          questionId: activeQuestion.id,
          xp: activeQuestion.xp,
          isCorrectAnswer: response,
        }),
      );
    }
  };

  useEffect(() => {
    if (activeQuestion) {
      setCorrectAnswer(activeQuestion.correctAnswer);
    }
  }, []);

  useEffect(() => {
    setCheckAnswer(null);
  }, [answers]);

  return (
    <>
      <div className="mt-20 flex h-auto w-full flex-col gap-4">
        {answers.map((answer) => (
          <button
            key={answer.id}
            onClick={() => setSelectedAnswer(answer)}
            disabled={checkAnswer !== null}
            className={`w-full rounded-lg border-2 p-6 text-left duration-200 ${getButtonStyles(answer)}`}
          >
            {answer.text}
          </button>
        ))}
      </div>
      <div className="mt-10 flex w-full justify-end">
        <button
          onClick={
            checkAnswer !== null ? handleNextQuestion : handleCheckAnswer
          }
          className="rounded-xl bg-[#93D333] px-8 py-3 text-base font-bold uppercase text-dark duration-200 hover:bg-[#93D333]/70"
        >
          {checkAnswer !== null ? "Próximo" : "Verificar"}
        </button>
      </div>
    </>
  );
}

export function MatchPairsQuestion({
  answers,
  handleHasFinishedLesson,
}: MatchPairsProps) {
  const [pairsMatch, setPairsMatch] = useState<PairProps[]>([]);
  const [selectedPair, setSelectedPair] = useState<Answer[] | []>([]);

  const checkIfCorrect = (pair: Answer[]) => {
    return pair[0].pairId === pair[1].pairId;
  };

  const handleSelectedPair = (selectedAnswer: Answer) => {
    setSelectedPair((prevState) => [...prevState, selectedAnswer]);
  };

  const getButtonStyles = (answerId: string) => {
    if (Array.isArray(pairsMatch)) {
      const foundPair = pairsMatch.find((pairObj) =>
        pairObj.pair.some((answer) => answer.id === answerId),
      );

      if (foundPair) {
        return foundPair.isCorrect
          ? "bg-green-600 border-green-600"
          : "bg-red-600 border-red-600";
      }

      const isAnswerSelected = selectedPair.find(
        (pair) => pair.id === answerId,
      );

      if (isAnswerSelected) {
        return "bg-blue border-blue";
      }

      return "border-border hover:border-blue hover:text-blue";
    }
    return "border-border hover:border-blue hover:text-blue";
  };

  useEffect(() => {
    if (selectedPair.length === 2) {
      setPairsMatch((prevState) => [
        ...prevState,
        { pair: selectedPair, isCorrect: checkIfCorrect(selectedPair) },
      ]);
      setSelectedPair([]);
    }
  }, [selectedPair]);

  useEffect(() => {
    const correctPairsCount = pairsMatch.filter(
      (pair) => pair.isCorrect === false,
    ).length;

    const verifyQuantityOfWrongPairs = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      handleHasFinishedLesson(true, "failure");
    };

    if (correctPairsCount > 1) {
      verifyQuantityOfWrongPairs();
    }
  }, [pairsMatch]);

  return (
    <div className="mx-auto mt-20 w-2/3">
      <div className="grid w-full grid-cols-2 items-center justify-center gap-8">
        {answers.map((answer) => (
          <button
            key={answer.id}
            onClick={() => handleSelectedPair(answer)}
            className={`w-full rounded-lg border-2 p-6 text-center duration-200 ${getButtonStyles(answer.id)} `}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
}
