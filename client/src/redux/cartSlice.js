import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const loadCart = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('cart'));
    if (saved && Array.isArray(saved.items)) {
      return {
        items: saved.items,
        totalQuantity: saved.totalQuantity || 0,
        totalAmount: saved.totalAmount || 0,
      };
    }
  } catch (e) {
  }
  return { items: [], totalQuantity: 0, totalAmount: 0 };
};

const initialState = loadCart();


const updateLocalStorage = (state) => {
  localStorage.setItem('cart', JSON.stringify({
    items: state.items,
    totalQuantity: state.totalQuantity,
    totalAmount: state.totalAmount,
  }));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id && item.size === newItem.size);
      
      state.totalQuantity++;
      state.totalAmount += newItem.price;
      
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          image: newItem.image,
          category: newItem.category,
          size: newItem.size || 'Default',
        });
        toast.success(`${newItem.name} added to cart`);
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
        toast.success(`Updated quantity for ${newItem.name}`);
      }
      updateLocalStorage(state);
    },
    updateQuantity(state, action) {
      const { id, size, delta } = action.payload;
      const item = state.items.find(item => item.id === id && item.size === size);
      if (item) {
        if (item.quantity + delta > 0) {
          item.quantity += delta;
          item.totalPrice = item.quantity * item.price;
          state.totalQuantity += delta;
          state.totalAmount += delta * item.price;
        }
      }
      updateLocalStorage(state);
    },
    removeFromCart(state, action) {
      const { id, size } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === id && item.size === size);
      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
        state.items.splice(existingItemIndex, 1);
        toast.error('Removed from cart');
      }
      updateLocalStorage(state);
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      updateLocalStorage(state);
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

