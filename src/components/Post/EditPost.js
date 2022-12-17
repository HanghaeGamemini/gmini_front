import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apis } from "../../lib/axios";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const navigate = useNavigate();
  const params = useParams();

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

  return (
    <div>
      <input
        // value={title}
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
        // value={contents}
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
    </div>
  );
};

export default EditPost;
