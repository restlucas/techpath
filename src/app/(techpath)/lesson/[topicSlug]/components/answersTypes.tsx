"use client";

import { useEffect, useState } from "react";
import { Answer } from "../page";
import { addAnsweredQuestion, Question } from "@/redux/slices/lessonSlice";
import { useDispatch } from "react-redux";
import { ArrowSquareDown, ArrowSquareUp } from "@phosphor-icons/react";
import shuffleArray from "@/utils/shuffleArray";

export type QuestionType =
  | "MULTIPLE_CHOICE"
  | "IDENTIFY_ERROR"
  | "TRUE_FALSE"
  | "COMPLETE_THE_SENTENCE";

interface BaseQuestionProps {
  answers: Answer[];
  activeQuestion: Question;
  handleNextQuestion: () => void;
}

type HaveFinishLessonProp = BaseQuestionProps & {
  handleHasFinishedLesson: (
    finished: boolean,
    status: "success" | "failure" | null,
  ) => void;
};

type MatchPairsProps = HaveFinishLessonProp & {};
type CorrectOrderProps = HaveFinishLessonProp & {};

type PairProps = {
  pair: Answer[] | [];
  isCorrect: boolean;
};

export const playAudio = (path: string) => {
  const audio = new Audio(path);
  audio.play().catch((err) => {
    console.error("Erro ao tentar tocar o áudio:", err);
  });
};

export function TypeGeneric({
  answers,
  activeQuestion,
  handleNextQuestion,
}: BaseQuestionProps) {
  const dispatch = useDispatch();
  const [shuffledAnswers, setShuffledAnswers] = useState<Answer[] | []>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [checkAnswer, setCheckAnswer] = useState<boolean | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

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
    const response = selectedAnswer?.text === correctAnswer;

    if (response) {
      playAudio("/audios/correct.mp3");
    } else {
      playAudio("/audios/wrong.mp3");
    }

    setCheckAnswer(response);
    dispatch(
      addAnsweredQuestion({
        questionId: activeQuestion.id,
        xp: activeQuestion.xp,
        isCorrectAnswer: response,
      }),
    );
  };

  useEffect(() => {
    if (activeQuestion) {
      setCorrectAnswer(activeQuestion.correctAnswer);
    }
  }, [activeQuestion]);

  useEffect(() => {
    setCheckAnswer(null);
    setSelectedAnswer(null);
  }, [answers]);

  useEffect(() => {
    const shuffledAnswers = shuffleArray(answers);
    setShuffledAnswers(shuffledAnswers);
  }, [answers]);

  return (
    <>
      <div className="mt-20 flex h-auto w-full flex-col gap-4">
        {shuffledAnswers.map((answer) => (
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
          disabled={!selectedAnswer}
          className="rounded-xl bg-green-600 px-8 py-3 text-base font-bold uppercase duration-200 hover:bg-green-600/70 disabled:bg-gray-700"
        >
          {checkAnswer !== null ? "Próximo" : "Verificar"}
        </button>
      </div>
    </>
  );
}

export function TypeMatchPairs({
  answers,
  activeQuestion,
  handleNextQuestion,
}: MatchPairsProps) {
  const dispatch = useDispatch();
  const [shuffledAnswers, setShuffledAnswers] = useState<Answer[] | []>([]);
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
    if (pairsMatch.length === answers.length / 2) {
      const haveIncorrectPair = pairsMatch.some((pair) => !pair.isCorrect);

      if (!haveIncorrectPair) {
        playAudio("/audios/correct.mp3");
      } else {
        playAudio("/audios/wrong.mp3");
      }

      dispatch(
        addAnsweredQuestion({
          questionId: activeQuestion.id,
          xp: activeQuestion.xp,
          isCorrectAnswer: !haveIncorrectPair,
        }),
      );
    }
  }, [pairsMatch]);

  useEffect(() => {
    const shuffledAnswers = shuffleArray(answers);
    setShuffledAnswers(shuffledAnswers);
    setPairsMatch([]);
  }, [answers]);

  return (
    <div className="mx-auto mt-20 w-3/4">
      <div className="grid w-full grid-cols-1 items-center justify-center gap-8 md:grid-cols-2">
        {shuffledAnswers.map((answer) => (
          <button
            key={answer.id}
            onClick={() => handleSelectedPair(answer)}
            disabled={
              pairsMatch.length === answers.length / 2 ||
              selectedPair.some((pair) => pair.id === answer.id) ||
              pairsMatch.some((pairObj) =>
                pairObj.pair.some((pairAnswer) => pairAnswer.id === answer.id),
              )
            }
            className={`w-full text-nowrap rounded-lg border-2 p-6 text-center duration-200 ${getButtonStyles(answer.id)} ${pairsMatch.length === answers.length / 2 && "pointer-events-none"}`}
          >
            {answer.text}
          </button>
        ))}
      </div>
      <div className="mt-10 flex w-full justify-end">
        <button
          onClick={handleNextQuestion}
          disabled={pairsMatch.length !== answers.length / 2}
          className={`rounded-xl px-8 py-3 text-base font-bold uppercase duration-200 ${pairsMatch.length === answers.length / 2 ? "point-events-none bg-green-600 hover:bg-green-600/70" : "bg-gray-700"}`}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}

export function TypeCorrectOrder({
  answers,
  handleNextQuestion,
  handleHasFinishedLesson,
}: CorrectOrderProps) {
  const [shuffledAnswers, setShuffledAnswers] = useState<Answer[] | []>([]);
  const [showCorrectOrder, setShowCorrectOrder] = useState(false);
  const [status, setStatus] = useState<"success" | "failure" | null>(null);

  const handleChangeOrder = (answer: Answer, order: "up" | "down") => {
    const targetIndex = shuffledAnswers.findIndex(
      (answerInArray) => answerInArray.id === answer.id,
    );

    const auxAnswerArray = shuffledAnswers.filter(
      (_, index) => index !== targetIndex,
    );

    auxAnswerArray.splice(
      order === "up" ? targetIndex - 1 : targetIndex + 1,
      0,
      answer,
    );

    const newAnswersOrder = [...auxAnswerArray];
    setShuffledAnswers(newAnswersOrder);
  };

  const handleCheckAnswersOrder = () => {
    setShowCorrectOrder(true);
    const isOrderIncorrect = shuffledAnswers.some(
      (answer, index) => (answer.order as number) - 1 !== index,
    );

    if (!isOrderIncorrect) {
      playAudio("/audios/correct.mp3");
    } else {
      playAudio("/audios/wrong.mp3");
    }

    setStatus(isOrderIncorrect ? "failure" : "success");
  };

  useEffect(() => {
    const shuffledAnswers = shuffleArray(answers);
    setShuffledAnswers(shuffledAnswers);
  }, [answers]);

  return (
    <div className="mx-auto mt-20 w-2/3">
      <div className="grid w-full grid-cols-1 items-center justify-center gap-8">
        {shuffledAnswers.map((answer, index) => (
          <div
            key={answer.id}
            className={`group flex w-full items-center justify-start gap-6 rounded-lg border-2 border-border p-6 text-left ${showCorrectOrder ? (index === (answer.order as number) - 1 ? "border-green-600 bg-green-600 fill-white" : "border-red-600 bg-red-600 fill-white") : "duration-200 hover:border-blue"}`}
          >
            <span
              className={`text-xl font-bold ${!showCorrectOrder && "group-hover:text-blue"}`}
            >
              {index + 1}
            </span>
            <span className={`${!showCorrectOrder && "group-hover:text-blue"}`}>
              {answer.text}
            </span>

            <div className="ml-auto flex items-center justify-end">
              {index !== 0 && (
                <button
                  onClick={() => handleChangeOrder(answer, "up")}
                  disabled={showCorrectOrder}
                >
                  <ArrowSquareUp
                    size={32}
                    className={`duration-200 ${!showCorrectOrder && "hover:fill-blue"}`}
                  />
                </button>
              )}
              {index !== shuffledAnswers.length - 1 && (
                <button
                  onClick={() => handleChangeOrder(answer, "down")}
                  disabled={showCorrectOrder}
                >
                  <ArrowSquareDown
                    size={32}
                    className={`duration-200 ${!showCorrectOrder && "hover:fill-blue"}`}
                  />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex w-full justify-end">
        <button
          onClick={
            status === null
              ? handleCheckAnswersOrder
              : status === "success"
                ? handleNextQuestion
                : () => handleHasFinishedLesson(true, "failure")
          }
          className="rounded-xl bg-green-600 px-8 py-3 text-base font-bold uppercase duration-200 hover:bg-green-600/70"
        >
          {status === null ? "Verificar" : "Próximo"}
        </button>
      </div>
    </div>
  );
}
