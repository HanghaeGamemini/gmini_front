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
  createPost: (post) => instance.post("/post", post), //추가
  getPost: () => instance.get("/post"), //조회
  editPosting: (id, post) => instance.patch(`/post/${id}`, post),
  getPostId: (id) => instance.get(`/post/${id}`), //조회
};
