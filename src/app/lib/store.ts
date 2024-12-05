import { create } from "zustand";
import { Status, Task } from "./types";
import { v4 as uuid } from "uuid";
import { persist } from "zustand/middleware";

export type TaskStore = {
  tasks: Task[];
	draggedTask: string | null;
	dragTask: (id: string) => void;
  addTask: (title: string, description?: string, status?: string) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, status: Status) => void;
};

export const useTaskStore = create<TaskStore>()(
	persist(
	set => ({
		tasks: [],
		draggedTask: null,
		dragTask: (id: string) => {
			set({ draggedTask: id })
		},
		addTask: (title: string, description?: string, status?: string) => 
			set(state => ({
				tasks: [
					...state.tasks,	
					{
						id: uuid(),
						title,
						description: description ?? "",
						status: status as Status,
					}
				]
			})),
		removeTask: (id: string) => {
			set(state => ({
				tasks: state.tasks.filter(task => task.id !== id)
			}))
		},
		updateTask: (id: string, status: Status) => {
			set(state => ({
				tasks: state.tasks.map(task => task.id === id ? { ...task, status } : task)
			}))
		},
	}), { name: "task-store" }
));
