import { gql } from "@apollo/client";

export const GET_MISSIONS = gql`
  query {
    missions @rest(type: "Mission", path: "/mission") {
      data {
        completed
        progress
        mission {
          id
          title
          description
          goalType
          goalValue
          rewardXp
          frequency
        }
      }
    }
  }
`;
