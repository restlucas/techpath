"use client";

import { useEffect, useState } from "react";
import {
  getQuestion,
  Lesson,
  Question as QuestionType,
} from "@/redux/slices/lessonSlice";
import { TypeCorrectOrder, TypeGeneric, TypeMatchPairs } from "./answersTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type QuestionLessonProps = {
  lesson: Lesson;
  handleHasFinishedLesson: (
    finished: boolean,
    status: "success" | "failure" | null,
  ) => void;
};

export function Question({
  lesson,
  handleHasFinishedLesson,
}: QuestionLessonProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState<QuestionType | null>(
    null,
  );

  const lessonHistory = useSelector(
    (state: RootState) => state.lesson.answeredQuestions,
  );

  const handleNextQuestion = () => {
    setQuestionIndex(questionIndex + 1);
  };

  useEffect(() => {
    const totalOfQuestions = lesson.questions.length;
    const totalOfWrongQuestionsAcceptable =
      totalOfQuestions - Math.floor(0.8 * totalOfQuestions);
    const totalOfWrongQuestions = lessonHistory.filter(
      (result) => result.isCorrectAnswer === false,
    ).length;

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

      {(activeQuestion.type === "MULTIPLE_CHOICE" ||
        activeQuestion.type === "IDENTIFY_ERROR" ||
        activeQuestion.type === "TRUE_FALSE" ||
        activeQuestion.type === "COMPLETE_THE_SENTENCE") && (
        <TypeGeneric
          activeQuestion={activeQuestion}
          handleNextQuestion={handleNextQuestion}
          answers={activeQuestion.answers}
        />
      )}
      {activeQuestion.type === "MATCH_PAIRS" && (
        <TypeMatchPairs
          activeQuestion={activeQuestion}
          handleNextQuestion={handleNextQuestion}
          handleHasFinishedLesson={handleHasFinishedLesson}
          answers={activeQuestion.answers}
        />
      )}
      {activeQuestion.type === "ORDER_CORRECTLY" && (
        <TypeCorrectOrder
          activeQuestion={activeQuestion}
          handleNextQuestion={handleNextQuestion}
          handleHasFinishedLesson={handleHasFinishedLesson}
          answers={activeQuestion.answers}
        />
      )}
    </>
  );
}
