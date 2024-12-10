"use client";

import { Login } from "@/modules/auth/login";
import { LogotButton } from "@/modules/auth/logot-button";
import { useUser } from "@/modules/auth/use-user";
import { prefetchTodo } from "@/modules/todo-list/prefetch-todo";
import { TodoList } from "@/modules/todo-list/todo-list";

export function ComponetsWrapper() {
  const user = useUser();
  if (user.data) {
		prefetchTodo();
		return (
      <>
        <LogotButton />
        <TodoList />
      </>
    );
  }
  return <Login />;
}
