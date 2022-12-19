import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { apis } from "../lib/axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { __deletePosting } from "../redux/modules/postSlice";

const DetailPage = () => {
  const [posts, setPosts] = useState();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apis.getPostId(params.id).then((res) => {
      setPosts(res.data);
      console.log("useEffect :", res);
    });
  }, [params.id]);
  console.log(posts);

  const delete_post = (id) => {
    if (window.confirm("post를 삭제하시겠습니까?")) {
      console.log(id);
      dispatch(__deletePosting(id));
      navigate("/");
    }
  };

  return (
    <div>
      디테일 페이지입니다.
      {/* 수정버튼을 누르면 Edit페이지로 넘어감 */}
      <button
        onClick={() => {
          navigate(`/detailedit/${params.id}`);
        }}
      >
        수정하기
      </button>
      <button
        onClick={() => {
          delete_post(params.id);
        }}
      >
        삭제
      </button>
      <button
        onClick={() => {
          navigate(`/`);
          //어디로 가야할까요 >_< ? 예진님이랑 고르기
        }}
      >
        이전으로
      </button>
      <div>{posts?.title}</div>
      <div>{posts?.contents}</div>
    </div>
  );
};

export default DetailPage;
