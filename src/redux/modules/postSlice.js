import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  post: [],
  isLoading: false,
  error: null,
};

export const __addPosting = createAsyncThunk(
  "addPosting",
  async (payload, thunkAPI) => {
    console.log("payload :", payload);
    try {
      const [title, contents] = payload;
      const newId = Math.floor(Math.random() * 10);
      const newPost = { title, contents, newId };
      console.log(newPost);
      await axios.put("http://localhost:3001/post", newPost);

      //   console.log("POST 추가 데이터", data);
      //   return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      console.log(err);

      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // addPosting: (state, action) => {
    //   state.post = [...state.post, action.payload];
  },
  //   },
  extraReducers: {},
});

// export const { addPosting } = postSlice.actions;

export default postSlice.reducer;
