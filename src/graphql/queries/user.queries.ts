import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query GetTrail($username: String!) {
    profile(username: $username)
      @rest(type: "Profile", path: "/user/{args.username}/profile") {
      data {
        id
        name
        email
        username
        image
        streak
        totalXp
        createdAt
        _count {
          followers
          following
        }
        trails {
          id
          name
          slug
          completed
        }
      }
    }
  }
`;

export const GET_FOLLOWING = gql`
  query GetFollowing($username: String!) {
    following(username: $username)
      @rest(type: "Following", path: "/user/{args.username}/follow") {
      data {
        _count {
          followers
          following
        }
      }
    }
  }
`;
