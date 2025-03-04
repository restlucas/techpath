import { gql } from "@apollo/client";

export const GET_TRAILS = gql`
  query {
    trails @rest(type: "Trail", path: "/trail") {
      data {
        id
        slug
        name
        description
        tags
      }
    }
  }
`;

export const GET_TRAIL = gql`
  query GetTrail($trailSlug: String!) {
    trail(trailSlug: $trailSlug)
      @rest(type: "Trail", path: "/trail/{args.trailSlug}") {
      data {
        id
        name
        slug
        description
        tags
        modules {
          id
          name
          description
          unlocked
          topics {
            id
            name
            slug
            description
            totalLessons
            totalLessonsCompleted
            totalXp
          }
        }
      }
    }
  }
`;

export const GET_TRAILS_PROGRESS = gql`
  query {
    trailsProgress @rest(type: "TrailsProgress", path: "/trail/progress/user") {
      data {
        id
        name
        slug
        completed
      }
    }
  }
`;
