import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '~/redux/store';
import { ThunkAction } from '~/types/thunkAction';
import { FlatProductsWithTagsAndImages } from '~/utils/createFlatProductObject';

interface GlobalState {
  isEditingFeaturedProducts: boolean;
  featuredCards: FlatProductsWithTagsAndImages[] | [];
}

const initialState: GlobalState = {
  isEditingFeaturedProducts: false,
  featuredCards: [],
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    editingFeaturedProductsChanged: (state, action: PayloadAction<boolean>) => {
      state.isEditingFeaturedProducts = action.payload;
    },
    featuredProductsChanged: (
      state,
      action: PayloadAction<FlatProductsWithTagsAndImages[]>,
    ) => {
      state.featuredCards = action.payload;
    },
  },
});

export const setIsEditingFeaturedProducts =
  (isEditingValue: boolean): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    dispatch(editingFeaturedProductsChanged(isEditingValue));
  };

export const setFeaturedCards =
  (
    cards: FlatProductsWithTagsAndImages[],
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    dispatch(featuredProductsChanged(cards));
  };

export const { editingFeaturedProductsChanged, featuredProductsChanged } =
  globalSlice.actions;

export default globalSlice.reducer;
