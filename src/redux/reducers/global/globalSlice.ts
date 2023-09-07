import { SiteConfig } from '@prisma/client';
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, RootState } from '~/redux/store';
import { ThunkAction } from '~/types/thunkAction';
import { FlatProductsWithTagsAndImages } from '~/utils/createFlatProductObject';

interface GlobalState {
  isEditingFeaturedProducts: boolean;
  featuredCards: FlatProductsWithTagsAndImages[] | [];
  heroData: SiteConfig;
}

const initialState: GlobalState = {
  isEditingFeaturedProducts: false,
  featuredCards: [],
  heroData: null,
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
    setHeroData: (state, action: PayloadAction<SiteConfig>) => {
      state.heroData = action.payload;
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

export const fetchHeroData =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    const res = await axios.get('/api/hero/update');
    dispatch(setHeroData(res.data));
  };

export const {
  editingFeaturedProductsChanged,
  featuredProductsChanged,
  setHeroData,
} = globalSlice.actions;

export default globalSlice.reducer;
