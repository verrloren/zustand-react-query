"use client";
import { ComponetsWrapper } from "@/components/componets-wrapper";
import { queryClient } from "@/shared/api/query-client";
import { store } from "@/shared/redux";
import { QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ComponetsWrapper />
      </Provider>
    </QueryClientProvider>
  );
}
