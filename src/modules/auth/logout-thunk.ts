import { queryClient } from "@/shared/api/query-client";
import { AppThunk } from "@/shared/redux";
import {  useMutation } from "react-query";
import { authSlice } from "./auth.slice";

export const logoutThunk =
  (): AppThunk =>
  async (dispatch) => {

		//при логауте нужно чистить кэш
    dispatch(authSlice.actions.removeUser());
    queryClient.removeQueries()
		localStorage.removeItem("userId");
  };

export const useLoginLoading = () =>
  useMutation({
    mutationKey: ["login"],
  }).isLoading;
