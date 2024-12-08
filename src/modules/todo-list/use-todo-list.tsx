import { useQuery } from "react-query";
import { todoListApi } from "./api";

export const useTodoList = () => {
  const {
    data: todoItems,
    error,
    isLoading,
  } = useQuery({
    ...todoListApi.getTodoListQueryOptions(),
		select: data => data.toReversed()
  });

  return { todoItems, error, isLoading };
};
