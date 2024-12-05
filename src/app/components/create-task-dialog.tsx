"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Task } from "../lib/types";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTaskStore } from "../lib/store";

export function CreateTaskDialog() {

	const addTask = useTaskStore(state => state.addTask);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const { title, description, status } = Object.fromEntries(formData) as unknown as Task;
    addTask(title, description, status);
  }


  return (
    <Dialog>
      <DialogTrigger
        className="w-12 h-12 rounded-full bg-white flex justify-center items-center
        hover:bg-neutral-200"
      >
        <Plus color="black" size={16} className="text-neural-600" />
      </DialogTrigger>

      <DialogContent className="bg-neutral-950 border-none rounded-2xl">
        <DialogTitle className="text-xl text-white">Add Task</DialogTitle>
        <form
          className="flex flex-col justify-start gap-4"
          onSubmit={handleSubmit}
        >
          <Input className="text-white border-neutral-600" placeholder="Title" required name="title" />
          <Input className="text-white border-neutral-600" placeholder="Description" required name="description" />
          <select name="status" className="text-white border-neutral-600 bg-neutral-800 p-2 rounded-md" required>
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
          <Button type="submit">Add Task</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}