import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  post: [],
  isLoading: false,
  error: null,
};

export const __getPosting = createAsyncThunk(
  "getPosting",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/post");
      // console.log('로딩데이터: ', data)
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

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

export const __deletePosting = createAsyncThunk(
  "deletePosting",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      await axios.delete(`http://localhost:3001/post/${payload}`, payload);
      console.log("데이터삭제, 리듀서는 id값 주기: ", payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __editStartPosting = createAsyncThunk(
  "editStartPosting",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await axios.patch(
        `http://localhost:3001/post/${payload.id}`,
        payload
      );
      console.log("수정: ", data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __editEndPosting = createAsyncThunk(
  "editEndPosting",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await axios.put(
        `http://localhost:3001/post/${payload.id}`,
        payload
      );
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
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
  extraReducers: {
    // export const { addPosting } = postSlice.actions;
    // --------------------------
    // 리스트 불러오기 ---------------
    [__getPosting.pending]: (state) => {
      state.isLoading = true;
      // 네트워크 요청 시작-> 로딩 true 변경합니다.
    },
    [__getPosting.fulfilled]: (state, action) => {
      // action으로 받아온 객체를 store에 있는 값에 넣어준다
      state.isLoading = false;
      //코드에 오류가 나지 않았을때 fullfilled인데 isLoading값을 false로 지정해주지않ㄷ으면
      //로딩중화면이 계속뜨게됨
      state.post = action.payload;
    },
    [__getPosting.rejected]: (state, action) => {
      state.isLoading = false; //코드에 오류가 났을때 reject
      state.error = action.payload;
      // 에러 발생-> 네트워크 요청은 끝,false
      // catch 된 error 객체를 state.error에 넣습니다.
    },
    // 리스트 추가 ------------------
    // [__addPosting.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [__addPosting.fulfilled]: (state, action) => {
    //   // 액션으로 받은 값 = payload 추가해준다.
    //   console.log("action-서버값", action.payload);
    //   state.isLoading = false;
    //   state.post = [...state.post, action.payload];
    // },
    // [__addPosting.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    // 리스트 삭제 ------------------
    [__deletePosting.pending]: (state) => {
      state.isLoading = true;
    },
    [__deletePosting.fulfilled]: (state, action) => {
      // 미들웨어를 통해 받은 action값이 무엇인지 항상 확인한다
      console.log("action-서버값", action.payload);
      state.isLoading = false;
      const newPost = state.post.filter((t) => t.id !== action.payload);
      state.post = [...newPost];
    },
    [__deletePosting.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 수정 버튼 클릭 -----------------
    // [__editStartPosting.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [__editStartPosting.fulfilled]: (state, action) => {
    //   // console.log('state-store값',state.diary)
    //   console.log("action-서버값", action);
    //   state.isLoading = false;
    //   const copy = [...state.post];
    //   const index = state.post.findIndex((c) => +c.id === +action.payload.id);
    //   state.post[index] = action.payload;
    //   state.post = [...state.post];
    // },
    // [__editStartPosting.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    // // 수정 완료 버튼 클릭 -----------------
    // [__editEndPosting.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [__editEndPosting.fulfilled]: (state, action) => {
    //   // console.log('state-store값',state.diary)
    //   console.log("action-서버값", action);
    //   state.isLoading = false;
    //   const index = state.diary.findIndex((c) => +c.id === +action.payload.id);
    //   state.post[index] = action.payload;
    //   state.post = [...state.post];
    // },
    // [__editEndPosting.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});

export default postSlice.reducer;
