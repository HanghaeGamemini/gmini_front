import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apis } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { __editStartPosting } from "../../redux/modules/postSlice";
import { useDispatch } from "react-redux";

const EditPost = (props) => {
  const propsPost = props.post;
  console.log("propPost는 무엇인가", propsPost);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

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
    apis
      .editPosting(id, post)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const edit_start = () => {
    //왜 e가 들어가는가? event?

    if (window.confirm("취소하면 수정되지 않습니다. 취소하시겠습니까?")) {
      navigate("/");
    } else {
      console.log();
      const newEditPost = {
        id: props.id,
        title: props.title,
        contents: props.contents,
        is_edit: !props.is_edit,
      };
      console.log(newEditPost);

      dispatch(__editStartPosting(newEditPost));
    }
    // 여기부분에서 메인 이동 안했을 때
    // 상세페이지에서 업데이트 된 부분 보여줌 좋겠는데! 함 생각해보기
  };

  return (
    <div>
      <input
        defaultValue={posts.title}
        onChange={(e) => {
          const { value } = e.target;
          setEditPost({
            ...editPost,
            title: value,
          });
          // setTitle(e.target.value);
        }}
      />
      <input
        defaultValue={posts.contents}
        onChange={(e) => {
          const { value } = e.target;
          setEditPost({
            ...editPost,
            contents: value,
          });
          // setContents(e.target.value);
        }}
      />
      <button
        onClick={() => {
          onEditHandler(params.id, editPost);
          navigate(`/detail/${params.id}`);
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
  );
};

export default EditPost;
