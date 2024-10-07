import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LikeState {
  likedItems: string[];
}

const initialState: LikeState = {
  likedItems: [], 
};

const likeSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      if (state.likedItems.includes(itemId)) {
        state.likedItems = state.likedItems.filter((id) => id !== itemId);
      } else {
        state.likedItems.push(itemId);
      }
    },
  },
});

export const { toggleLike } = likeSlice.actions;
export default likeSlice.reducer;