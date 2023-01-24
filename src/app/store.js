import { configureStore } from "@reduxjs/toolkit";
import PostPomodoroReducer from "../features/PostPomodoro";

export const store = configureStore({
  reducer: {
    post: PostPomodoroReducer,  
  },
});
