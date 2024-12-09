import { UseInfiniteQueryOptions, UseQueryOptions } from "react-query";
import { jsonApiInstance } from "../../shared/api/api-instance";

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
    userId: string;
};

// создать общий объект, в котором будут все методы для работы с сервером
export const todoListApi = {
    baseKey: "tasks",
    getTodoListQueryOptions: (): UseQueryOptions<TodoDto[]> => {
        return {
            queryKey: [todoListApi.baseKey, "list"],
            queryFn: meta => 
                jsonApiInstance<TodoDto[]>(
                    `/tasks`, {
                    signal: meta.signal,
                    json: null
                }),
        }
    },
    getTodoListInfiniteQueryOptions: (): UseInfiniteQueryOptions<PaginatedResult<TodoDto>> => {
        return {
            queryKey: [todoListApi.baseKey, "list"],
            queryFn: ({ pageParam = 1 }) =>
                jsonApiInstance<PaginatedResult<TodoDto>>(`/tasks?_page=${pageParam}&_per_page=10`, {
                    json: null
                }),
            getNextPageParam: (lastPage) => lastPage.next,
        }
    },

    createTodo: (data: TodoDto) => {
        return jsonApiInstance<TodoDto>(`/tasks`, {
            method: "POST",
            json: data,
        })
    },
    updateTodo: (data: Partial<TodoDto> & {id: number}) => {
        return jsonApiInstance<TodoDto>(`/tasks/${data.id}`, {
            method: "PATCH",
            json: data
        })
    },
    deleteTodo: (id: number) => {
        return jsonApiInstance<void>(`/tasks/${id}`, {
            method: "DELETE",
            json: null
        })
    },
};


