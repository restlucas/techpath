"use client";

import {
  ADD_USER_TO_FOLLOWING,
  REMOVE_USER_FROM_FOLLOWING,
} from "@/graphql/mutation/user.mutation";
import { addFollowing, removeFollowing } from "@/redux/slices/followSlice";
import { RootState } from "@/redux/store";
import {
  ApolloQueryResult,
  OperationVariables,
  useMutation,
} from "@apollo/client";
import { UserCheck, UserPlus } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";

type RefetchProps = {
  _count: {
    followers: number;
    following: number;
  };
};

type FollowButtonProps = {
  userId: string;
  refetch: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<RefetchProps>>;
};

export function FollowButton({ userId, refetch }: FollowButtonProps) {
  const dispatch = useDispatch();
  const following = useSelector((state: RootState) => state.follow.following);

  const [addUserToFollowing] = useMutation(ADD_USER_TO_FOLLOWING);
  const [removeUserFromFollow] = useMutation(REMOVE_USER_FROM_FOLLOWING);

  const handleFollowUser = async (userId: string) => {
    if (!following.includes(userId)) {
      await addUserToFollowing({
        variables: {
          userIdToFollow: userId,
        },
      });

      dispatch(addFollowing(userId));
    } else {
      await removeUserFromFollow({
        variables: {
          userIdToUnfollow: userId,
        },
      });

      dispatch(removeFollowing(userId));
    }
    refetch();
  };

  return following.includes(userId) ? (
    <button
      onClick={() => handleFollowUser(userId)}
      className="flex w-[150px] cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-border bg-transparent px-4 py-2 text-green-600 duration-200 hover:bg-selected"
    >
      <span className="font-bold">Seguindo</span>
      <UserCheck size={22} className="fill-green-600" />
    </button>
  ) : (
    <button
      onClick={() => handleFollowUser(userId)}
      className="flex w-[150px] cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-blue bg-blue px-4 py-2 text-dark duration-200 hover:bg-[#2c6b87]"
    >
      <span className="font-bold">Seguir</span>
      <UserPlus size={22} className="fill-dark" />
    </button>
  );
}
