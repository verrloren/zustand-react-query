"use client";
import { ComponetsWrapper } from "@/components/componets-wrapper";
import { Provider } from "react-redux";
import { store } from "@/shared/redux";
import { queryClient } from "@/shared/api/query-client";
import { QueryClientProvider } from "react-query";
import { Loader } from "@/components/loader";
import { prefetchAuth } from "@/modules/auth/prefetch-auth";

export default function Home() {
	prefetchAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Loader>
					<ComponetsWrapper />
				</Loader>
      </Provider>
    </QueryClientProvider>
  );
}
