import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFinished: false,
  isPause: false,
};

const PostPomodoro = createSlice({
  name: "PostPomdoro",
  initialState,
  reducers: {
    finishedPomodoro: (state, action) => {
      state.isFinished = !state.isFinished;
      state.isPause = false;
    },
    pausePomodoro: (state, action) => {
      state.isPause = !state.isPause;
    },
  },
});

export const { finishedPomodoro, pausePomodoro } = PostPomodoro.actions;
export default PostPomodoro.reducer;
