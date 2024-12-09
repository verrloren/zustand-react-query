"use client";

import { useEffect, useRef } from "react";
import { createSwapy } from "swapy";
import { Column } from "./column";
import { CreateTaskDialog } from "./create-task-dialog";
import { useTaskStore } from '../app/lib/store';

export function Columns() {

	const dragTask = useTaskStore(state => state.dragTask);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const swapy = createSwapy(containerRef.current, {
        swapMode: "hover",
      });
      swapy.onSwap(({ data }) => {
        localStorage.setItem("slotItem", JSON.stringify(data.object));
      });
      swapy.onSwapStart(({ data }) => {
				dragTask(data.object[Object.keys(data.object)[0]]);
      });

      return () => {
        swapy.destroy();
      };
    }
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-5 w-full p-4 max-w-[80%]">
      <CreateTaskDialog />
      <div className="flex min-h-96 gap-16 w-full">
        <Column header="Todos" slot="1" status="TODO" />
        <Column header="In Progress" slot="2" status="IN_PROGRESS" />
        <Column header="Done" slot="3" status="DONE" />
      </div>
    </div>
  );
}