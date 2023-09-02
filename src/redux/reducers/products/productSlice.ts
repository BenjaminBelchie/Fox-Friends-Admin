import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, RootState } from '~/redux/store';
import { ProductWithTagsAndImages } from '~/types/Product';
import { ThunkAction } from '~/types/thunkAction';

interface ProductState {
  products: ProductWithTagsAndImages[] | null;
}

const initialState: ProductState = {
  products: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductWithTagsAndImages[]>) => {
      state.products = action.payload;
    },
  },
});

export const fetchProducts =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    const res = await axios.get('/api/products');
    dispatch(setProducts(res.data));
  };

export const findProductById = (state: ProductState, productId: string) => {
  return state.products.find(product => product.id === productId);
};

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
