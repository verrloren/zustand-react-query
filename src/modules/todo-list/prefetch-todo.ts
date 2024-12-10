import { store } from "@/shared/redux"
import { queryClient } from "@/shared/api/query-client";
import { authSlice } from "../auth/auth.slice";
import { authApi } from "../auth/api";

export const prefetchTodo = () => {
	const userId = authSlice.selectors.userId(store.getState());
	if(userId) {
		queryClient.prefetchQuery(authApi.getUserById(userId));
	}
}