/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "react-query";
import { todoListApi } from "./api";
import { nanoid } from "nanoid";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo,
    async onSettled() {
      //помечает все запросы по ключу как stale, и перезапршивает только те которые сейчас активны. он не рефетчит все запросы, которых нет на этой странице, а только те которые сейчас есть
      await queryClient.invalidateQueries({
				queryKey: [todoListApi.baseKey]
			});
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = String(formData.get("text") ?? "");

    createTodoMutation.mutate({
      id: Number(nanoid()),
      title: text,
      done: false,
      userId: "1",
    });
    e.currentTarget.reset();
  };

  return {
    handleSubmit,
    isLoading: createTodoMutation.isLoading,
  };
}
