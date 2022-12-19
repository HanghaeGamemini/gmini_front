const onAddHandler = (post) => {
    // event.preventDefault();
    // if (title === "" && contents === "") {
    //   alert("POST를 작성해주세요.");
    //   return;
    // }
    // // 새로운 데이터가 추가되면 list를 만들고
    // // const newPost = {
    // //   id: Math.floor(Math.random() * 100),
    // //   title: title,
    // //   contents: contents,
    // // };
    // // dispatch(변화)를 발생시켜서 액션을 리듀서에 보낸다.
    // // redux에서 __addDiary(액션)가 어떤 일을 하는지 명시해줘야함
    // // dispatch(__addPosting(newPost));

    // // input내용들 초기화 ("")빈값을 넣어줘
    // setTitle("");v
    // setContents("");

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