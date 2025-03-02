import { gql } from "@apollo/client";

export const GET_LESSON = gql`
  query GetLesson($topicSlug: String!) {
    lesson(topicSlug: $topicSlug)
      @rest(type: "Lesson", path: "/lesson/{args.topicSlug}") {
      data {
        id
        name
        trailSlug
        questions {
          id
          text
          type
          xp
          lessonId
          correctAnswer
          answers {
            id
            text
            questionId
            order
            pairId
          }
        }
      }
    }
  }
`;
