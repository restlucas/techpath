import { gql } from "@apollo/client";

export const ADD_USER_TO_FOLLOWING = gql`
  mutation AddUserToFollowing {
    addUserToFollowing(input: { userIdToFollow: $userIdToFollow })
      @rest(
        type: "AddUserToFollowing"
        path: "/user/{args.input.userIdToFollow}/follow"
        method: "POST"
      ) {
      userIdToFollow
    }
  }
`;
export const REMOVE_USER_FROM_FOLLOWING = gql`
  mutation RemoveUserFromFollowing {
    removeUserFromFollowing(input: { userIdToUnfollow: $userIdToUnfollow })
      @rest(
        type: "AddUserToFollowing"
        path: "/user/{args.input.userIdToUnfollow}/follow"
        method: "DELETE"
      ) {
      userIdToUnfollow
    }
  }
`;
