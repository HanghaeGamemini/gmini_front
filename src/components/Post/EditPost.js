import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apis } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { __editEndPosting } from "../../redux/modules/postSlice";
import { useDispatch } from "react-redux";
import "../../pages/reset.css";
import "../../pages/post.css";

const EditPost = (props) => {
  const propsPost = props.post;
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [img, setImg] = useState("");

  const onChangeImg = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };

  const [editPost, setEditPost] = useState({});
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    apis.getPostId(params.id).then((res) => {
      setPosts(res.data);
      console.log("useEffect :", res);
    });
  }, [params.id]);

  const onEditHandler = (id, post) => {
    // console.log("수정버튼 누름");
    console.log(editPost);
    const newEditPost = {
      id: id,
      title: editPost.title,
      content: editPost.content,
      file: img,
    };
    console.log(newEditPost);

    dispatch(__editEndPosting(newEditPost));
    // navigate(`/detail/${params.id}`);
  };

  const edit_start = () => {
    //왜 e가 들어가는가? event?

    if (window.confirm("취소하면 수정되지 않습니다. 취소하시겠습니까?")) {
      navigate("/");
    } else {
      console.log();
    }
    // 여기부분에서 메인 이동 안했을 때
    // 상세페이지에서 업데이트 된 부분 보여줌 좋겠는데! 함 생각해보기
  };

  return (
    <div className="postwrap">
      <div className="postheader">
        <h1 className="logo">
          <a href="/">LOGO</a>
        </h1>
      </div>
      <div className="postbox">
        <textarea
          defaultValue={posts.title}
          onChange={(e) => {
            const { value } = e.target;
            setEditPost({
              ...editPost,
              title: value,
            });
            // setTitle(e.target.value);
          }}
          className="postingtitle"
          placeholder="제목을 입력해주세요"
        />
        <textarea
          defaultValue={posts.content}
          onChange={(e) => {
            const { value } = e.target;
            setEditPost({
              ...editPost,
              content: value,
            });
            // setContent(e.target.value);
          }}
          className="postingcontent"
          placeholder="내용을 입력해주세요"
        />
        <input
          type="file"
          defaultValue={posts.file}
          onChange={onChangeImg}
          className="posting_img"
        />
        <div className="buttonwrap">
          <button
            onClick={() => {
              onEditHandler(params.id, editPost);
            }}
          >
            수정완료
          </button>
          <button
            onClick={() => {
              edit_start(propsPost);
            }}
          >
            수정취소
          </button>
          <button
            onClick={() => {
              navigate(`/detail/${params.id}`);
            }}
          >
            이전으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
