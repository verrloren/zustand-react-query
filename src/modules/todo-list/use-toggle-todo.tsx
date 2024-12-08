/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "react-query";
import { TodoDto, todoListApi } from "./api";

export function useToggleTodo() {
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation({
    mutationFn: todoListApi.updateTodo,
    onMutate: async newTodo => {
      // cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: [todoListApi.baseKey]
      });
      // snapshot the previous value
      const previousTodos = queryClient.getQueryData<TodoDto[]>(
        [todoListApi.baseKey, "list"]
      );
      // optimistically update to the new value
      if (previousTodos) {
        queryClient.setQueryData(
          [todoListApi.baseKey, "list"],
          previousTodos.map(todo =>
            todo.id === newTodo.id ? { ...todo, ...newTodo } : todo
          )
        );
      }
      // context можно использовать для отката недаудавшихся оптимистиных обновлений
      return { previousTodos };
    },
    // if the mutation fails, use the context to roll back
    onError: (_, __, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(
          [todoListApi.baseKey, "list"],
          context.previousTodos
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries([todoListApi.baseKey, "list"]);
    }
  });

  const toggleTodo = (id: number, done: boolean) => {
    updateTodoMutation.mutate({
      id,
      done: !done
    });
  };
  return {
    toggleTodo,
  };
}
