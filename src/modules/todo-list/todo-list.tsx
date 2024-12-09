"use client";

import { CreateTaskDialogQuery } from "@/components/create-task-dialog-query";
import { useTodoList } from "./use-todo-list";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDeleteTodo } from "./use-delete-todo";
import { useToggleTodo } from "./use-toggle-todo";
import { useCreateTodoLoading } from "./create-todo-thunk";

export function TodoList() {
  const { error, isLoading, todoItems } = useTodoList();
	
	const isLoadingCreate = useCreateTodoLoading();
	const deleteTodo = useDeleteTodo();
	const { toggleTodo } = useToggleTodo();

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;


  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col relative">
      <CreateTaskDialogQuery />

      {todoItems ? (
        todoItems.map(
          (task) =>
            task && (
              <div style={{
								width: "24rem",
								height: "6rem",
								backgroundColor: "#87C379",
								borderRadius: "0.5rem",
								padding: "1rem",
								margin: "1rem",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center"
							}} key={task.id} className="w-96 h-24 flex justify-between items-center">
								<input 
									type="checkbox" 
									checked={task.done} 
									onChange={() => toggleTodo(task.id, task.done)} 
								/>
								<h5 className="mb-2 text-white text-center" >
									{task.title}
								</h5>
								<Button disabled={isLoadingCreate} onClick={() => deleteTodo.handleDelete(task.id)}><Trash2 className="text-white" /></Button>
							</div>
            )
        )
      ) : (
        <div>No tasks available</div>
      )}
    </div>
  );
}