"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateTodo } from "@/modules/todo-list/use-create-todo";

export function CreateTaskDialogQuery() {
  const createTodo = useCreateTodo();

  return (
    <Dialog>
      <DialogTrigger
        className="absolute py-2 rounded-full 
		top-0 right-[5%] bg-white h-10 w-10 text-black"
      >
				+
			</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <form action="submit" onSubmit={createTodo.handleSubmit}>
            <Input type="text" name="text" placeholder="Your task" />
            <Button disabled={createTodo.isLoading} type="submit">
              Submit
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
