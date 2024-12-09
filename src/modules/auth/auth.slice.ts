'use client'
import { rootReducer } from "@/shared/redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type AuthState = {
	userId: string | undefined;
	loginError?: string | undefined;
}

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		userId: localStorage.getItem('userId')
	} as AuthState,
	selectors: {
		userId: state => state.userId,
		loginError: state => state.loginError
	},
	reducers: {
		addUser(state, action: PayloadAction<{userId: string}>){
			state.userId = action.payload.userId;
			state.loginError = undefined;
		},
		removeUser(state){
			state.userId = undefined
		},
		setError(state, action: PayloadAction<string | undefined>) {
			state.loginError = action.payload
		}
	}
}).injectInto(rootReducer)