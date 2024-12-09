import { useQuery } from "react-query";
import { authApi } from "./api";
import { useAppSelector } from "@/app/hooks/react-redux";
import { authSlice } from "./auth.slice";

export function useUser() {

	const userId = useAppSelector(authSlice.selectors.userId)

	return useQuery({
		...authApi.getUserById(userId!),
		enabled: Boolean(userId),
	})
}