'use client'

import { useMemo } from "react";
import { useTaskStore } from "../lib/store";
import { TaskComponent } from "./task-component";
import { Status } from "../lib/types";

interface ColumnProps {
  header: string;
  slot: string;
  status: Status;
}

export function Column({ header, slot, status }: ColumnProps) {
	const tasks = useTaskStore(state => state.tasks);
  const filteredTasks = useMemo(() => tasks.filter(task => task.status === status), [tasks, status]);
  
	const updateTask = useTaskStore(state => state.updateTask);
	const draggedTask = useTaskStore(state => state.draggedTask);
	const dragTask = useTaskStore(state => state.dragTask);

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		if (!draggedTask) return;
		updateTask(draggedTask, status);
		dragTask(null);
	}

  return (
    <div className="w-full min-h-36 flex flex-col gap-y-2">
      <h5 className="select-none text-xl text-white">{header}</h5>
      <div onDrop={handleDrop} onDragOver={e => e.preventDefault()} className="flex-1 h-36 gap-y-2 bg-neutral-900 rounded-xl p-2" data-swapy-slot={slot}>
        {filteredTasks.map((task) => (
          <TaskComponent key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
}