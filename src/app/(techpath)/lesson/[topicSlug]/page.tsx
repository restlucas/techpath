"use client";

import { Session } from "next-auth";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

import { getResults, setLesson } from "@/redux/slices/lessonSlice";
import { RootState } from "@/redux/store";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_LESSON_RESULTS } from "@/graphql/mutation/lesson.mutation";
import { updateSession } from "@/utils/session";
import { GET_LESSON } from "@/graphql/queries/lesson.queries";
import { LessonQuestion } from "./components/lessonQuestion";

export type Answer = {
  id: string;
  questionId: string;
  text: string;
  order: number | null;
  pairId: number | null;
  conceptId: number | null;
};

export type Question = {
  id: string;
  lessonId: string;
  text: string;
  type: string;
  correctAnswer: string | null;
  correctStatement: string | null;
  errorPosition: string | null;
  xp: number;
  answers: Answer[];
};

export type Lesson = {
  id: string;
  name: string;
  topicId: string;
  questions: Question[];
};

type FinisheLessonProps = {
  lessonStatus: "success" | "failure" | null;
  userId: string;
  lessonId: string;
  redirectUrl: string;
};

function FinishedLesson({
  lessonStatus,
  userId,
  lessonId,
  redirectUrl,
}: FinisheLessonProps) {
  const [addLessonResults] = useMutation(ADD_LESSON_RESULTS);

  const lessonResults = useSelector((state: RootState) =>
    getResults(state.lesson),
  );

  const resetLesson = async () => {
    updateSession(redirectUrl);
  };

  const finishLesson = async () => {
    await addLessonResults({
      variables: {
        totalXpEarned: 100,
        completed: true,
        lessonId,
        userId,
      },
    });
  };

  useEffect(() => {
    if (lessonStatus === "success") {
      finishLesson();
    }
  }, [lessonStatus]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col gap-8">
        <h1 className="text-center text-3xl font-bold text-blue">
          Lição finalizada!
        </h1>
        <p className="text-center">
          {lessonStatus === "success" ? "Você passou!" : "Tente novamente!"}
        </p>
        <button
          onClick={resetLesson}
          className="rounded-lg border-2 border-border px-6 py-3 text-center font-bold duration-200 hover:border-blue hover:bg-blue hover:text-white"
        >
          Continuar
        </button>

        <div className="flex flex-col gap-2">
          {lessonStatus === "success" ? (
            <p className="text-center font-semibold">
              Total de exp obtido:{" "}
              <span className="text-blue">{lessonResults}xp</span>
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default function Lesson() {
  const { data } = useSession();
  const { user } = data as Session;
  const { topicSlug } = useParams();

  const dispatch = useDispatch();
  const lesson = useSelector((state: RootState) => state.lesson.lesson);

  const { data: lessonData } = useQuery(GET_LESSON, {
    variables: { topicSlug },
  });

  const [redirectUrl, setRedirectUrl] = useState<string>("");

  const [hasFinishedLesson, setHasFinishedLesson] = useState<{
    finished: boolean;
    status: "success" | "failure" | null;
  }>({ finished: false, status: null });

  const handleHasFinishedLesson = (
    finished: boolean,
    status: "success" | "failure" | null,
  ) => {
    setHasFinishedLesson({ finished, status });
  };

  useEffect(() => {
    if (lessonData) {
      const selectedLesson = lessonData.lesson.data;
      dispatch(setLesson(selectedLesson));
      setRedirectUrl(selectedLesson.trailSlug);
    }
  }, [lessonData, dispatch]);

  if (!lesson) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        No lesson found...
      </div>
    );
  }

  if (!hasFinishedLesson.finished) {
    return (
      <div className="mt-16 flex h-auto w-[1100px] flex-col px-10 py-6">
        <h1 className="text-4xl font-bold text-blue">{lesson.name}</h1>
        <LessonQuestion
          lesson={lesson}
          handleHasFinishedLesson={handleHasFinishedLesson}
        />
      </div>
    );
  }

  return (
    <FinishedLesson
      lessonStatus={hasFinishedLesson.status}
      userId={user.id}
      lessonId={lesson.id}
      redirectUrl={redirectUrl}
    />
  );
}
