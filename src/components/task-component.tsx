'use client'

import { useTaskStore } from "../app/lib/store";
import { TrashDialog } from "./trash-dialog"

interface TaskComponentProps {
  id: string;
  title: string;
  description?: string;
  status: string;
}

export function TaskComponent({ id, title, description, status }: TaskComponentProps) {

	const dragTask = useTaskStore(state => state.dragTask);

  return (
    <div
			draggable
			onDrag={() => dragTask(id)}
      data-swapy-item={id}
      className={`select-none w-full mb-2 h-28 flex flex-col cursor-pointer relative p-4 rounded-2xl 
      ${status === "TODO" && "bg-[#b95050]"}
      ${status === "IN_PROGRESS" && "bg-[#508db9]"}
      ${status === "DONE" && "bg-[#50b97f]"}
      `}
    >
      <TrashDialog id={id} />
      <h3 className="text-2xl">{title}</h3>
      <p className="text-sm from-neutral-600">{description}</p>
    </div>
  )
}