// import { useSweet } from "../../utils/useSweet";
// 스윗알럿쓸거면 풀기
// import axios from "axios";
// import { instance } from "./axios";
import { apis } from "./axios";

export const postLogin = async (post) => {
  //apis를 가져오면서 postLogin이라는 함수를 쓸거고
  try {
    const data = await apis.postLogin(post);
    //( )안에 필요한 값을 데이터를 넣어준다.
    return data;
  } catch (error) {
    alert("에러발생");
    // useSweet(1000, "error", error.response.data.msg);
  }
};

export const postSignup = async (post) => {
  try {
    const data = await apis.postSignup(post);
    // useSweet(1000, "success", "회원가입 성공");
    return data;
  } catch (error) {
    alert("에러발생");
    // useSweet(1000, "error", error.response.data.msg);
  }
};

//createasyncthunk는 여기서는 사용하지 않는다.
