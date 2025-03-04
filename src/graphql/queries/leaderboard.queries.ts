import { gql } from "@apollo/client";

export const GET_LEADERBOARD = gql`
  query {
    leaderboard @rest(type: "Leaderboard", path: "/leaderboard") {
      data {
        id
        xpEarned
        weekStart
        user {
          name
          image
        }
      }
    }
  }
`;
