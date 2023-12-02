import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const saveTasks = createAsyncThunk(
  "taks/saveTasks",
  async (taskData, thunkAPI) => {
    try {
     
      if (taskData) {
        return taskData;
      } else {
       
        return thunkAPI.rejectWithValue(taskData);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);



const initialState = {
  taksData:[],
  isTaskSavedSuccess:false,
  isTaskSavedFail:false,
  isTaskSavedFetch:false,

};

export const TaskSlice = createSlice({
  name: "Task",
  initialState: initialState,
  reducers: {
    clearTaskSliceState: (state) => {
      return {
        ...state,
        isTaskSavedSuccess:false,
        isTaskSavedFail:false,
        isTaskSavedFetch:false,
       
      };
    },
    taskManager: (state, action) => 
    {
      let existingIndex = state.taksData.findIndex((el) => {
        return el.taskName == action?.payload?.payload?.name;
      });
      if (existingIndex > -1) 
      {
        if (action?.payload?.payload?.toBeRemoved) 
        {
          
          state.taksData.splice(existingIndex, 1);
        }
        else if(action?.payload?.payload?.toBeUpdate)
        {
          state.taksData[existingIndex].status="Complete"
        }
      }

    }
  },
  extraReducers: {
    [saveTasks.fulfilled]: (state, { payload }) => {
    
      let arr=[...state.taksData]
      arr.push(payload)
      state.taksData=arr
      state.isTaskSavedFetch = false;
      state.isTaskSavedFail = false;
      state.isTaskSavedSuccess = true
    },
    [saveTasks.pending]: (state) => {
      state.isTaskSavedFetch = true;
      state.isTaskSavedFail = false;
      state.isTaskSavedSuccess = false
    },
    [saveTasks.rejected]: (state, { payload }) => {
      state.isTaskSavedFetch = false;
      state.isTaskSavedFail = true;
      state.isTaskSavedSuccess = false
    }
  },
});

export const TaskSelector = (state) => state.Task;
export default TaskSlice.reducer;
export const {clearTaskSliceState,taskManager} = TaskSlice.actions;
