import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apis } from "../../lib/axios";
import { useDispatch } from "react-redux";
import { __addPosting } from "../../redux/modules/postSlice";
import "../../pages/reset.css";
import "../../pages/post.css";

function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [img, setImg] = useState("");
  const params = useParams("");
  const [showimg, setShowImg] = useState("");
  const imgRef = useRef();
  let form = new FormData();

  const navigate = useNavigate();
  const dispatch = useDispatch("");

  const [post, setPost] = useState({
    title: "",
    content: "",
  });
  console.log(post);
  // const [posts, setPosts] = useState([]);
  // console.log(posts);

  // const dispatch = useDispatch;
  // console.log(title, content); //기능은 위로, 보여주는 곳은 아래

  const onChangeImg = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    setImg(file);
    // let form = new FormData();
    form.append("file", file);
    console.log(form);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setShowImg(reader.result);
    };
  };

  const onAddHandler = (post) => {
    // event.preventDefault();
    if (post.title === "" && post.content === "") {
      alert("POST를 작성해주세요.");
      return;
    }
    alert("POST 작성 완료!");
    // navigate(`/`);
    // 새로운 데이터가 추가되면 list를 만들고
    // console.log(form);
    const newPost = {
      title: post.title,
      content: post.content,
      file: img,
    };
    // dispatch(변화)를 발생시켜서 액션을 리듀서에 보낸다.
    // redux에서 __addDiary(액션)가 어떤 일을 하는지 명시해줘야함
    dispatch(__addPosting(newPost));

    // input내용들 초기화 ("")빈값을 넣어줘
    setTitle("");
    setContent("");

    // apis;
    // .createPost(post)
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    // setTitle("");
    // setContent("");
  };
  // useEffect(() => {
  //   apis.getPost().then((res) => {
  //     setPosts(res.data);
  //   });
  // }, []);

  return (
    <div className="postwrap">
      <div className="postheader">
        <h1 className="logo">
          <a href="/">LOGO</a>
        </h1>
      </div>

      <div className="postbox">
        <textarea
          // value={title}
          onChange={(e) => {
            const { value } = e.target;
            setPost({
              ...post,
              title: value,
            });
            // setTitle(e.target.value);
          }}
          className="postingtitle"
          placeholder="제목을 입력해주세요"
        />
        <textarea
          // value={content}
          rows="20"
          cols="100"
          onChange={(e) => {
            const { value } = e.target;
            setPost({
              ...post,
              content: value,
            });
            // setContent(e.target.value);
          }}
          className="postingcontent"
          placeholder="내용을 입력해주세요"
        />
        <input
          type="file"
          ref={imgRef}
          // value={imgUrl}
          encType="multipart/form-data"
          className="posting_img"
          onChange={onChangeImg}
        />
        <div className="buttonwrap">
          <button
            onClick={() => {
              onAddHandler(post);
            }}
          >
            등록
          </button>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            이전으로
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
