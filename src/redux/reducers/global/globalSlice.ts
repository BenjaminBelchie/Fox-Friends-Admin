import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '~/redux/store';
import { ThunkAction } from '~/types/thunkAction';

interface GlobalState {
  isEditingFeaturedProducts: boolean;
}

const initialState: GlobalState = {
  isEditingFeaturedProducts: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    editingFeaturedProductsChanged: (state, action: PayloadAction<boolean>) => {
      state.isEditingFeaturedProducts = action.payload;
    },
  },
});

export const setIsEditingFeaturedProducts =
  (isEditingValue: boolean): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    dispatch(editingFeaturedProductsChanged(isEditingValue));
  };

export const { editingFeaturedProductsChanged } = globalSlice.actions;

export default globalSlice.reducer;
