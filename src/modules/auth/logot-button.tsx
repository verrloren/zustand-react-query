"use client";

import { useAppDispatch } from "@/app/hooks/react-redux";
import { Button } from "@/components/ui/button";
import { logoutThunk } from "./logout-thunk";

export function LogotButton() {
  const dispatch = useAppDispatch();

  return (
    <Button
      onClick={() => dispatch(logoutThunk())}
      className="border border-rose-500 p-3 rounded"
    >
      Logot
    </Button>
  );
}
