import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apis } from "../../lib/axios";

const initialState = {
  postList: [],
  isLoading: false,
  isSuccess: false,
  error: null,
};

export const __getPosting = createAsyncThunk(
  "getPosting",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://3.34.98.133/api/post?page=1&");
      console.log("로딩데이터: ", data);
      return thunkAPI.fulfillWithValue(data.data.data);
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
      const form = new FormData();
      form.append("file", payload.file);
      // const requestDto = {
      //   title: payload.title,
      //   content: payload.content,
      // };
      // form.append(
      //   "requestDto",
      //   new Blob([JSON.stringify(requestDto)], { type: "application/json" })
      // );

      //백에서 모델어트리뷰트...? //33~40까지 주석석 //(이미지 여러개 받기 편함)
      form.append("title", payload.title); //form데이터가 객체라 form만 보내면됨
      form.append("content", payload.content);
      const data = await axios.post("http://3.34.98.133/api/post", form, {
        //
        // const data = await axios.post("http://3.34.98.133/api/post", form, {
        //이거 오리지널(이미지를 여러개 받기 불편)
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("id"),
        },
      });

      console.log("POST 추가 데이터", data);
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
      const deletedata = await axios.delete(
        `http://3.34.98.133/api/post/${payload}`,

        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: localStorage.getItem("id"),
          },
        }
      );
      // await axios.delete(`http://localhost:3000/post/${payload}`, payload);

      // console.log("데이터삭제, 리듀서는 id값 주기: ", payload);
      console.log("POST 삭제 데이터", deletedata);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __editEndPosting = createAsyncThunk(
  "editEndPosting",
  async (payload, thunkAPI) => {
    console.log("payload :", payload);
    const form = new FormData();
    form.append("file", payload.file);
    form.append("title", payload.title); //form데이터가 객체라 form만 보내면됨
    form.append("content", payload.content);

    console.log(form);

    try {
      const data = await axios.put(
        `http://3.34.98.133/api/post/${payload.id}`,
        form,
        {
          //
          // const data = await axios.post("http://3.34.98.133/api/post", form, {
          //이거 오리지널(이미지를 여러개 받기 불편)
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("id"),
          },
        }
      );

      console.log("POST 추가 데이터", data);
      //   return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      console.log(err);

      return thunkAPI.rejectWithValue(err);
    }
  }
);

// export const __editEndPosting = createAsyncThunk(
//   "editEndPosting",
//   async (payload, thunkAPI) => {
//     console.log(payload);
//     try {
//       const data = await axios.put(`http://3.34.98.133/api/post/${payload}`);
//       console.log(data);
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (err) {
//       console.log(err);
//       return thunkAPI.rejectWithValue(err);
//     }
//   }
// );

export const __likeToggle = createAsyncThunk(
  "likeToggle",
  async (payload, thunkAPI) => {
    try {
      const data = await apis.clickLike(payload);
      // const data = await axios.post("http://localhost:3000/post", payload);
      console.log("payload: ", payload);
      console.log("data: ", data.data);
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
      state.isSuccess = true;
      state.post = action.payload.postList;
    },
    [__getPosting.rejected]: (state, action) => {
      state.isLoading = false; //코드에 오류가 났을때 reject
      state.error = action.payload;
      // 에러 발생-> 네트워크 요청은 끝,false
      // catch 된 error 객체를 state.error에 넣습니다.
    },
    // 리스트 추가 ------------------
    [__addPosting.pending]: (state) => {
      state.isLoading = true;
    },
    [__addPosting.fulfilled]: (state, action) => {
      // 액션으로 받은 값 = payload 추가해준다.

      console.log("action-서버값", action.payload);
      console.log("state값", state);
      state.isLoading = false;
      state.post.data.postList = [...state.post.data.postList, action.payload];
    },
    [__addPosting.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
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
    [__editEndPosting.pending]: (state) => {
      state.isLoading = true;
    },
    [__editEndPosting.fulfilled]: (state, action) => {
      // console.log('state-store값',state.diary)
      console.log("action-서버값", action);
      state.isLoading = false;
      const index = state.diary.findIndex((c) => +c.id === +action.payload.id);
      state.post[index] = action.payload;
      state.post = [...state.post];
    },
    [__editEndPosting.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //좋아요
    [__likeToggle.pending]: (state) => {
      state.isLoading = true;
    },
    [__likeToggle.fulfilled]: (state, action) => {
      // 액션으로 받은 값 = payload 추가해준다.
      console.log("action: ", action.payload);
      state.isLoading = false;
      state.posts = action.payload;
    },
    [__likeToggle.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;
