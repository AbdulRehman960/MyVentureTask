import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const saveLocation = createAsyncThunk(
  "auth/saveLocation",
  async (locationData, thunkAPI) => {
    try {

        return locationData;
     
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);


const initialState = 
{
    location:{}
};

export const LocationSlice = createSlice({
  name: "location",
  initialState: initialState,
  extraReducers: {
   
    [saveLocation.fulfilled]: (state, { payload }) => 
    {
      state.location=payload
     
    },
    [saveLocation.pending]: (state) => {
     
    },
    [saveLocation.rejected]: (state, { payload }) => {
     
    }
  },
});

export const Selector = (state) => state.Auth;
export default LocationSlice.reducer;
export const {clearFetch} = LocationSlice.actions;
