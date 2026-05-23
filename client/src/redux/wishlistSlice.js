import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return JSON.parse(localStorage.getItem('wishlist')) || [];
      
      const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/profile/wishlist', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!res.ok) throw new Error('Failed to fetch wishlist');
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleWishlistServer = createAsyncThunk(
  'wishlist/toggleServer',
  async (product, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/profile/wishlist/toggle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ productId: product.id })
        });
      }
      return product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: JSON.parse(localStorage.getItem('wishlist')) || [],
  status: 'idle',
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist(state, action) {
      const product = action.payload;
      const existingIndex = state.items.findIndex(item => item.id === product.id);
      
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
        toast.error(`${product.name} removed from wishlist`);
      } else {
        state.items.push(product);
        toast.success(`${product.name} added to wishlist`);
      }
      
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    removeFromWishlist(state, action) {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    clearWishlist(state) {
      state.items = [];
      localStorage.removeItem('wishlist');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWishlist.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    });
  }
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export const toggleWishlistAndSync = (product) => (dispatch) => {
  dispatch(toggleWishlist(product));
  dispatch(toggleWishlistServer(product));
};

export const removeFromWishlistAndSync = (product) => (dispatch) => {
  dispatch(removeFromWishlist(product.id));
  dispatch(toggleWishlistServer(product));
};

export default wishlistSlice.reducer;

