import { gql } from "@apollo/client";

// export const ADD_LESSON_RESULTS = gql`
//   mutation AddLessonResults(
//     $totalXpEarned: Int!
//     $completed: Boolean!
//     $lessonId: ID!
//     $userId: ID!
//   ) {
//     addLessonResults(
//       input: {
//         totalXpEarned: $totalXpEarned
//         completed: $completed
//         lessonId: $lessonId
//         userId: $userId
//       }
//     )
//       @rest(
//         type: "LessonResult"
//         path: "/trail/{lessonId}/results"
//         method: "POST"
//       ) {
//       id
//       totalXpEarned
//       completed
//       lessonId
//       userId
//     }
//   }
// `;
export const ADD_LESSON_RESULTS = gql`
  mutation AddLessonResults {
    addLessonResults(
      input: {
        totalXpEarned: $totalXpEarned
        completed: $completed
        lessonId: $lessonId
        userId: $userId
      }
    )
      @rest(
        type: "LessonResult"
        path: "/lesson/{args.input.lessonId}/results"
        method: "POST"
      ) {
      id
      totalXpEarned
      completed
      lessonId
      userId
    }
  }
`;
