'use client'
import { queryClient } from "@/shared/api/query-client";
import { store } from "@/shared/redux";
import { QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

export function QueryReduxWrapper({children}: {children: React.ReactNode}) {
	return (
		<QueryClientProvider client={queryClient}>
      <Provider store={store}>
				{children}
		</Provider>
    </QueryClientProvider>
	)
}
