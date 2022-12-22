import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { apis } from "../lib/axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { __deletePosting } from "../redux/modules/postSlice";
import Likes from "../components/Like/Likes";

const DetailPage = () => {
  const [posts, setPosts] = useState();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(123);

    apis.getPostId(params.id).then((res) => {
      setPosts(res.data.data);
      console.log("useEffect :", res);
    });
  }, []);
  // console.log(posts);

  const delete_post = (id) => {
    if (window.confirm("post를 삭제하시겠습니까?")) {
      console.log(id);
      dispatch(__deletePosting(id));
      navigate("/");
    }
  };
  console.log(posts);
  return (
    <div className="postwrap">
      <div className="postheader">
        <h1 className="logo">
          <a href="/">LOGO</a>
        </h1>
      </div>
      <div className="detail">
        {/* 수정버튼을 누르면 Edit페이지로 넘어감 */}
        <div className="detailwrap">
          <div className="post_title">{posts?.title}</div>
          <div>
            <img src={posts?.imgUrl} className="post_image" />
          </div>
          <div className="post_content">{posts?.content}</div>
        </div>
        <Likes posts={posts} className="likes"></Likes>
        <div className="detail_buttonwrap">
          <button
            onClick={() => {
              navigate(`/detailedit/${posts.id}`);
            }}
          >
            수정하기
          </button>
          <button
            onClick={() => {
              delete_post(posts.id);
            }}
          >
            삭제
          </button>
          <button
            onClick={() => {
              navigate(`/`);
            }}
          >
            이전으로
          </button>
        </div>
      </div>
      <div className="comment">
        댓글
        <div>
          <input />
          <button className="postcomment">댓글달기</button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
