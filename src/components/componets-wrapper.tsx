"use client";

import { Login } from "@/modules/auth/login";
import { LogotButton } from "@/modules/auth/logot-button";
import { useUser } from "@/modules/auth/use-user";
import { TodoList } from "@/modules/todo-list/todo-list";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { QueryClient } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/query-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";




const persistQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 1000 * 60 * 60 * 24, // 24 hours
			staleTime: 2000,
			retry: 0,
		},
	}
})

const persister = createSyncStoragePersister({
	storage: window.localStorage,
})


export function ComponetsWrapper() {

	

  const user = useUser();

  if (user.isLoading) return <div>Loading...</div>;

  if (user.data) return (
	    <PersistQueryClientProvider
      client={persistQueryClient}
      persistOptions={{ persister }}
      onSuccess={() => {
        // resume mutations after initial restore from localStorage was successful
        queryClient.resumePausedMutations().then(() => {
          queryClient.invalidateQueries()
        })
      }}
    >
				<LogotButton />
				<TodoList />
		</PersistQueryClientProvider>
)
  return <Login />;
}
