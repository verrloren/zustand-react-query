import { Action, asyncThunkCreator, buildCreateSlice, combineSlices, configureStore, createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";
import { extraArgument } from "./exra-argument";

export const rootReducer = combineSlices();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export type ThunkExtraArg = typeof extraArgument;

export type ThunkApiConfig = {
  state: AppState;
  dispatch: AppDispatch;
  extra: ThunkExtraArg;
};

export type ExtraArgument = typeof extraArgument;

export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>();

export const createSlice = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator },
})

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
});