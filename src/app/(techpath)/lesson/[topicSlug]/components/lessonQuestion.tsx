"use client";

import { useEffect, useState } from "react";
import {
  getHistory,
  getQuestion,
  Lesson,
  Question,
} from "@/redux/slices/lessonSlice";
import { MatchPairsQuestion, MultipleChoiceQuestion } from "./answerOptions";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type QuestionLessonProps = {
  lesson: Lesson;
  handleHasFinishedLesson: (
    finished: boolean,
    status: "success" | "failure" | null,
  ) => void;
};

export function LessonQuestion({
  lesson,
  handleHasFinishedLesson,
}: QuestionLessonProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);

  // const history = useSelector(
  //   (state: RootState) => state.lesson.answeredQuestions,
  // );

  const handleNextQuestion = () => {
    setQuestionIndex(questionIndex + 1);
  };

  useEffect(() => {
    const totalOfQuestions = lesson.questions.length;
    const totalOfWrongQuestionsAcceptable = Math.floor(0.8 * totalOfQuestions);
    // const totalOfWrongQuestions = lessonHistory.filter(
    //   (result) => result.isCorrectAnswer === false,
    // ).length;
    const totalOfWrongQuestions = 0;

    if (
      totalOfQuestions > 0 &&
      totalOfWrongQuestionsAcceptable < totalOfWrongQuestions
    ) {
      handleHasFinishedLesson(true, "failure");
      return;
    } else if (lesson.questions.length > 0) {
      if (lesson.questions.length > questionIndex) {
        const question = getQuestion(lesson, questionIndex);

        setActiveQuestion(question);
      } else {
        handleHasFinishedLesson(true, "success");
      }
    }
  }, [lesson, questionIndex]);

  if (!activeQuestion) {
    return null;
  }

  return (
    <>
      <p className="mt-8">{activeQuestion.text}</p>

      {activeQuestion.type === "MULTIPLE_CHOICE" && (
        <MultipleChoiceQuestion
          activeQuestion={activeQuestion}
          handleNextQuestion={handleNextQuestion}
          answers={activeQuestion.answers}
        />
      )}
      {activeQuestion.type === "MATCH_PAIRS" && (
        <MatchPairsQuestion
          activeQuestion={activeQuestion}
          handleNextQuestion={handleNextQuestion}
          handleHasFinishedLesson={handleHasFinishedLesson}
          answers={activeQuestion.answers}
        />
      )}
      {/* <div className="mt-20 flex h-auto w-full flex-col gap-4">
        {activeQuestion.answers.map((answer) => (
          <button
            key={answer.id}
            onClick={() => setSelectedAnswer(answer)}
            disabled={checkAnswer !== null}
            className={`w-full rounded-lg border-2 p-6 text-left duration-200 ${getButtonStyles(answer)}`}
          >
            {answer.text}
          </button>
        ))}
      </div> */}
    </>
  );
}
