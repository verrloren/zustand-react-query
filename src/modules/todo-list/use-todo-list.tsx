import { useQuery } from "react-query";
import { todoListApi } from "./api";
import { useUser } from "../auth/use-user";

export const useTodoList = () => {

	const userId = useUser().data?.id;

	if (!userId) {
		throw new Error("User is not found");
	}
	const {
    data: todoItems,
  } = useQuery({
    ...todoListApi.getTodoListQueryOptions({ userId: userId }),
		select: data => data.toReversed(),
		suspense: true
  });

  return { todoItems };
};
