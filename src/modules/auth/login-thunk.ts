import { queryClient } from "@/shared/api/query-client";
import { AppThunk } from "@/shared/redux";
import { MutationObserver, useMutation } from "react-query";
import { authApi } from "./api";
import { authSlice } from "./auth.slice";

export const loginThunk =
  (login: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      const user = await new MutationObserver(queryClient, {
        mutationKey: ["login"],
        mutationFn: authApi.loginUser,
      }).mutate({
        login,
        password,
      });

      if (user) {
        dispatch(authSlice.actions.addUser({ userId: user.id }));
      }
			if(user && user.id) {

        const queryKey = authApi.getUserById(user.id!).queryKey;
        if (queryKey) {
          queryClient.setQueryData(queryKey, user);
        }
				localStorage.setItem("userId", user.id);
			}


    } catch (error) {
      dispatch(
        authSlice.actions.setError(`Invalid login or password: ${error}`)
      );
    }
  };

export const useLoginLoading = () =>
  useMutation({
    mutationKey: ["login"],
  }).isLoading;
