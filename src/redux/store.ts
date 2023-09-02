import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import globalSlice from './reducers/global/globalSlice';
import productSlice from './reducers/products/productSlice';

export const store = configureStore({
  reducer: {
    globalSlice,
    productSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
