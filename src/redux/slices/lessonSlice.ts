import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Answer = {
  id: string;
  questionId: string;
  text: string;
  order: number | null;
  pairId: number | null;
};

export type Question = {
  id: string;
  lessonId: string;
  text: string;
  type:
    | "MULTIPLE_CHOICE"
    | "MATCH_PAIRS"
    | "ORDER_CORRECTLY"
    | "IDENTIFY_ERROR"
    | "FILL_IN_THE_BLANK"
    | "TRUE_FALSE"
    | "COMPLETE_THE_SENTENCE"
    | "RELATE_CONCEPTS";
  correctAnswer: string | null;
  correctStatement: string | null;
  errorPosition: string | null;
  xp: number;
  answers: Answer[];
};

export type Lesson = {
  id: string;
  name: string;
  questions: Question[];
};

type State = {
  lesson: Lesson;
  answeredQuestions: {
    questionId: string;
    xp: number;
    isCorrectAnswer: boolean;
  }[];
};

const initialState: State = {
  lesson: {
    id: "",
    name: "",
    questions: [],
  },
  answeredQuestions: [],
};

const lessonSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLesson: (state, action: PayloadAction<Lesson>) => {
      state.lesson.id = action.payload.id;
      state.lesson.name = action.payload.name;
      state.lesson.questions = action.payload.questions;
    },
    clearLesson: (state) => {
      state.lesson = {
        id: "",
        name: "",
        questions: [],
      };
      state.answeredQuestions = [];
    },
    addAnsweredQuestion: (
      state,
      action: PayloadAction<{
        questionId: string;
        xp: number;
        isCorrectAnswer: boolean;
      }>,
    ) => {
      const { questionId, xp, isCorrectAnswer } = action.payload;

      state.answeredQuestions.push({
        questionId,
        xp,
        isCorrectAnswer,
      });
    },
  },
});

export const { setLesson, clearLesson, addAnsweredQuestion } =
  lessonSlice.actions;
export default lessonSlice.reducer;

export const getQuestion = (state: Lesson, index: number = 0): Question => {
  const questions = state.questions;

  return questions[index];
};

export const getHistory = (
  state: State,
): {
  questionId: string;
}[] => {
  return state.answeredQuestions;
};

export const getResults = (state: State): number => {
  const totalXpObtained = state.answeredQuestions.reduce((sum, question) => {
    return question.isCorrectAnswer ? sum + question.xp : sum;
  }, 0);

  return totalXpObtained;
};

export const makeLessonFinished = async () => {};
