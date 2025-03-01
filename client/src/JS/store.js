import { configureStore } from "@reduxjs/toolkit";
import memeReducer from "./Memes/memeSlice";

const store = configureStore({
  reducer: {
    memes: memeReducer,
  },
});

export default store;