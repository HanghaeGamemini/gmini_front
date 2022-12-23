import axios from "axios";

export const instance = axios.create({
  baseURL: "http://3.34.98.133/api",
  header: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const baseURL = axios.create({
  baseURL: "http://3.34.98.133/api",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

baseURL.interceptors.request.use((config) => {
  if (config.headers === undefined) return;
  const token = localStorage.getItem("id");
  config.headers["Authorization"] = `${token}`;
  return config;
});

export const apis = {
  //관리하기 편하려고 만듬
  //똑같은 api인데 다르게 동작할 수 있기도 하고
  //(객체형식->)언제든 편하게 갖다쓰려고 나눠서 씀

  //로그인 관련 apis
  postLogin: (post) => instance.post("/user/login", post), //post가 앞 괄호에 들어가면 뒷괄호에도 들어감(넘겨주는 값에 그대로 들어감)
  // postLogout: () => instance.get("/user/logout"),
  postSignup: (post) => instance.post("/user/signup", post),

  //게시글 관련 apis //instance
  createPost: (post) =>
    baseURL.post("/post", post, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  //   //추가
  getPost: () => baseURL.get("/post"), //조회,
  editPosting: (id, post) => baseURL.put(`/post/${id}`, post),
  getPostId: (id) => baseURL.get(`/post/${id}`), //조회
  deletePost: (id) => baseURL.delete(`/post/${id}`), //삭제

  //댓글 관련 apis

  //좋아요 관련 apis
  clickLike: (postId) => baseURL.post(`likes/${postId}`),
};
