import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const saveCurrentLogedinUserData = createAsyncThunk(
  "auth/saveUserData",
  async (userData, thunkAPI) => {
    try {
      if (userData?.email) {
        return userData;
      } else {
       
        return thunkAPI.rejectWithValue(userData);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);


const initialState = {
  currrentLogedInUser:{},
  isUserLogedinSuccess:false,
  isUserLogedinFail:false,
  isUserLogedinFetch:false,

};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState: initialState,
  extraReducers: {
   

   



    [saveCurrentLogedinUserData.fulfilled]: (state, { payload }) => {
      state.currrentLogedInUser=payload
      state.isUserLogedinFetch = false;
      state.isUserLogedinFail = false;
      state.isUserLogedinSuccess = true
    },
    [saveCurrentLogedinUserData.pending]: (state) => {
      state.isUserLogedinFetch = true;
      state.isUserLogedinFail = false;
      state.isUserLogedinSuccess = false
    },
    [saveCurrentLogedinUserData.rejected]: (state, { payload }) => {
      state.isUserLogedinFetch = false;
      state.isUserLogedinFail = true;
      state.isUserLogedinSuccess = false
    }
  },
});

export const AuthSelector = (state) => state.Auth;
export default AuthSlice.reducer;
export const {clearFetch} = AuthSlice.actions;
