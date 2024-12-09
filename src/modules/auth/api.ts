import { jsonApiInstance } from "@/shared/api/api-instance";
import { UseQueryOptions } from "react-query";

export type PaginatedResult<T> = {
  data: T[];
  first: number;
  items: number;
  last: number | null;
  next: number | null;
  pages: number;
  prev: number | null;
};

//  dto значит Data Transfer Object. так помечают данные которые пришли с сервера.
export type UserDto = {
  id: string;
  login: string;
  password: string;
};

// создать общий объект, в котором будут все методы для работы с сервером
export const authApi = {
  baseKey: "users",
  getUserById: (id: string): UseQueryOptions<UserDto> => {
    return {
      queryKey: [authApi.baseKey, "byId", id],
      queryFn: (meta) =>
        jsonApiInstance<UserDto>(`/users/${id}`, {
          signal: meta.signal,
          json: null,
        }),
    };
  },
  loginUser: ({login, password}: {login: string, password: string}) => 
    jsonApiInstance<UserDto[]>(`/users?login=${login}&password=${password}`, {json: null })
      .then((r => r[0] as UserDto | undefined))
  
};
