/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "react-query";
import { TodoDto, todoListApi } from "./api";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation( todoListApi.deleteTodo, {
    async onSettled() {
			//не помечаем как await, чтобы не ждать пока запросы будут выполнены
	  const queryKey = todoListApi.getTodoListQueryOptions().queryKey;
	  if (queryKey) {
		queryClient.invalidateQueries<TodoDto[]>(queryKey);
	  }
	},
	async onSuccess(_, deletedId) {
		const queryKey = todoListApi.getTodoListQueryOptions().queryKey;
		if (queryKey) {
			const todos = queryClient.getQueryData<TodoDto[]>(queryKey);
			if (todos) {
				queryClient.setQueryData(
					queryKey,
					todos.filter(todo => todo.id !== deletedId)
				);
			}
		}
	}
  });

  return {
    handleDelete: deleteTodoMutation.mutate,
    isLoading: deleteTodoMutation.isLoading,
		getIsPending: (id: number) => deleteTodoMutation.isLoading && deleteTodoMutation.variables === id
  };
}
