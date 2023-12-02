import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  position:0
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
   
    togglePosition: (state,action) => {
      state.position = action.payload?.latestIndex
    },
  },
});

export const {togglePosition} = themeSlice.actions;
export default themeSlice.reducer;
