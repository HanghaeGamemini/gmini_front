import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
  header: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const apis = {
  //관리하기 편하려고 만듬
  //똑같은 api인데 다르게 동작할 수 있기도 하고
  //(객체형식->)언제든 편하게 갖다쓰려고 나눠서 씀
  createPost: (post) => instance.post("/post", post), //추가
  getPost: () => instance.get("/post"), //조회
  editPosting: (id, post) => instance.patch(`/post/${id}`, post),
  getPostId: (id) => instance.get(`/post/${id}`), //조회
};
