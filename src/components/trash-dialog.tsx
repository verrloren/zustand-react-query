"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Trash2 } from "lucide-react";
import { useTaskStore } from "../app/lib/store";

export function TrashDialog({ id }: { id: string }) {

	const removeTask = useTaskStore(state => state.removeTask)

	const onDelete = (id: string) => {
		removeTask(id)
	}

  return (
    <Dialog>
      <DialogTrigger>
					<Trash2
					className="w-6 h-6 absolute top-3 right-3 cursor-pointer flex flex-center items-center 
					bg-transparent border border-neutral-900 rounded-full p-1 hover:bg-red-500 transition-colors z-10"
        	  size={24}
        	/>
      </DialogTrigger>
      <DialogContent className="bg-neutral-950 rounded-2xl border-none p-8">

				<DialogClose className="absolute top-3 right-3 cursor-pointer" />

        <DialogHeader>
          <DialogTitle className="text-3xl pb-2 text-white">Are you absolutely sure?</DialogTitle>
					<DialogDescription className="pb-4">
						This action cannot be undone. This will permanently delete the task.
					</DialogDescription>
					<div className="flex items-center w-full">
						<Button onClick={() => onDelete(id)} className="w-full bg-red-500 hover:bg-red-600">Delete</Button>
					</div>

        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
