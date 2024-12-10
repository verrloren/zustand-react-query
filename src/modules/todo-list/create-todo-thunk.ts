import { queryClient } from "@/shared/api/query-client";
import { AppThunk } from "@/shared/redux";
import { MutationObserver, useMutation } from "react-query";
import { TodoDto, todoListApi } from "./api";
import { nanoid } from "nanoid";
import { authSlice } from "../auth/auth.slice";
import { authApi } from "../auth/api";

export const createTodoThunk =
  (text: string): AppThunk =>
  async (dispatch, getState) => {
    // get userId from auth state
    const userId = authSlice.selectors.userId(getState());

    if (!userId) {
      throw new Error("user not login");
    }
		// get user from cache
		const user = await queryClient.fetchQuery(authApi.getUserById(userId));

    const newTodo: TodoDto = {
      //@ts-expect-error: T12332
      id: String(nanoid()) as string,
      done: false,
      title: `${text} - ${user.login}`,
      userId,
    };

    // optimistic update. 1) cancel queries, 2) update cache, and 3) invalidate queries
    queryClient.cancelQueries({
      queryKey: [todoListApi.baseKey],
    });

    const prevTasks = queryClient.getQueryData([todoListApi.getTodoListQueryOptions({ userId }).queryKey]);

    queryClient.setQueryData(
      [todoListApi.getTodoListQueryOptions({ userId }).queryKey],
      (tasks: TodoDto[] = []) => [...tasks, newTodo]
    );

    try {
      await new MutationObserver(queryClient, {
        mutationFn: todoListApi.createTodo,
      }).mutate(newTodo);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      queryClient.setQueriesData(
        [todoListApi.getTodoListQueryOptions({ userId }).queryKey],
        prevTasks
      );
    } finally {
      queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey],
      });
    }
  };

export const useCreateTodoLoading = () =>
  useMutation({
    mutationKey: ["create-todo"],
  }).isLoading;