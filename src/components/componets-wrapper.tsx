"use client";

import { Login } from "@/modules/auth/login";
import { LogotButton } from "@/modules/auth/logot-button";
import { useUser } from "@/modules/auth/use-user";
import { TodoList } from "@/modules/todo-list/todo-list";

export function ComponetsWrapper() {
  const user = useUser();

  if (user.isLoading) return <div>Loading...</div>;

  if (user.data) return <><LogotButton /><TodoList /></>
  return <Login />;
}
