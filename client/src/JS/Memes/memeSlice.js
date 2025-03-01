import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action pour récupérer les mèmes
export const fetchMemes = createAsyncThunk("memes/fetchMemes", async () => {
  const response = await axios.get("http://localhost:5000/api/memes"); // Remplace avec ton URL backend
  return response.data;
});

const memeSlice = createSlice({
  name: "memes",
  initialState: {
    memes: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addMeme: (state, action) => {
      state.memes.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMemes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.memes = action.payload;
      })
      .addCase(fetchMemes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addMeme } = memeSlice.actions;
export default memeSlice.reducer;
