import { store } from "@/shared/redux"
import { authSlice } from "./auth.slice"
import { queryClient } from "@/shared/api/query-client";
import { authApi } from "./api";

export const prefetchAuth = () => {
	const userId = authSlice.selectors.userId(store.getState());
	if(userId) {
		queryClient.prefetchQuery(authApi.getUserById(userId));
	}
}