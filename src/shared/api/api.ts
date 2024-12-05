import { UseInfiniteQueryOptions, UseQueryOptions } from "react-query";
import { jsonApiInstance } from "./api-instance";


export type PaginatedResult<T> = {
	data: T[]
	first: number
	items: number
	last: number | null
	next: number | null
	pages: number
	prev: number | null
}

//  dto значит Data Transfer Object. так помечают данные которые пришли с сервера.
export type TodoDto = {
  id: number;
  title: string;
  done: boolean;
};

// создать общий объект, в котором будут все методы для работы с сервером
export const todoListApi = {
	getTodoListQueryOptions: ({page}: {page: number}): UseQueryOptions<PaginatedResult<TodoDto>> => {
		return {
			queryKey: ["tasks", "list", { page }],
			queryFn: meta => 
				jsonApiInstance<PaginatedResult<TodoDto>>(`/tasks?_page=${page}&_per_page=10`, {
					signal: meta.signal
				}),
		}
	},
	getTodoListInfiniteQueryOptions: (): UseInfiniteQueryOptions<PaginatedResult<TodoDto>> => {
		return {
			queryKey: ["tasks", "list"],
			// queryFn: ({ pageParam = 1 }) => todoListApi.getTodoList({ page: pageParam }, {}),
      queryFn: ({ pageParam = 1 }) =>
        jsonApiInstance<PaginatedResult<TodoDto>>(`/tasks?_page=${pageParam}&_per_page=10`, {}),
			getNextPageParam: (lastPage) => lastPage.next,
		}
	}
};
