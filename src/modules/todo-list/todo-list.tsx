"use client";

import { useTodoList } from "./use-todo-list";

export function TodoList() {
  const { cursor, error, isLoading, todoItems, isPlaceholderData } = useTodoList();

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div>
      {todoItems.map((task) => (
        task && (
          <h5
            className={`mb-2 text-white text-center ${
              isPlaceholderData ? "opacity-50" : ""
            }`}
            key={task.id}
          >
            {task.title}
          </h5>
        )
      ))}
      {cursor}
    </div>
  );
}