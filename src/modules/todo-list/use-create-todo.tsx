/* eslint-disable react-hooks/rules-of-hooks */
import { useAppDispatch } from "@/app/hooks/react-redux";
import { createTodoThunk, useCreateTodoLoading } from "./create-todo-thunk";

export function useCreateTodo() {

  const appDispatch = useAppDispatch();
  const isLoading = useCreateTodoLoading();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = String(formData.get("text") ?? "");

    await appDispatch(createTodoThunk(text));

    if (e.currentTarget) {
      e.currentTarget.reset();
    }
  };

  return {
    handleSubmit,
    isLoading
  };
}