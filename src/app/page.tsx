'use client'
import { QueryClientProvider } from "react-query";
import { queryClient } from '../shared/api/query-client';
import { TodoList } from "@/modules/todo-list/todo-list";
import { ReactQueryDevtools } from 'react-query/devtools'

export default function Home() {
  return (
		<QueryClientProvider client={queryClient}>

				<TodoList />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
  );
}
