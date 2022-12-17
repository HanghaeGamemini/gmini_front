import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apis } from "../../lib/axios";
import { useDispatch } from "react-redux";
import { __addPosting } from "../../redux/modules/postSlice";

function AddPost() {
  // const [title, setTitle] = useState("");
  // const [contents, setContents] = useState("");
  const navigate = useNavigate();
  // const dispatch = useDispatch("");

  const [post, setPost] = useState({
    title: "",
    contents: "",
  });
  const [posts, setPosts] = useState([]);
  console.log(posts);
  // const dispatch = useDispatch;
  // console.log(title, contents); //기능은 위로, 보여주는 곳은 아래

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
    // setTitle("");
    // setContents("");

    apis
      .createPost(post)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // setTitle("");
    // setContents("");
  };
  // useEffect(() => {
  //   apis.getPost().then((res) => {
  //     setPosts(res.data);
  //   });
  // }, []);
  return (
    <div>
      <input
        // value={title}
        onChange={(e) => {
          const { value } = e.target;
          setPost({
            ...post,
            id: Math.floor(Math.random() * 100),
            title: value,
          });
          // setTitle(e.target.value);
        }}
      />
      <input
        // value={contents}
        onChange={(e) => {
          const { value } = e.target;
          setPost({
            ...post,
            id: Math.floor(Math.random() * 100),
            contents: value,
          });
          // setContents(e.target.value);
        }}
      />
      <button
        onClick={() => {
          onAddHandler(post);
          navigate(`/detail/${post.id}`);
        }}
      >
        등록
      </button>
      <button
        onClick={() => {
          navigate(`/`);
        }}
      >
        이전으로
      </button>
    </div>
  );
}

export default AddPost;
