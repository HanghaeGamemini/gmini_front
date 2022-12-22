import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __likeToggle } from "../../redux/modules/postSlice";

function Likes(props) {
  const navigate = useNavigate();
  const [likeToggle, setLikeToggle] = useState(false);
  const likes = useRef(0);
  const dispatch = useDispatch();
  //     let [board, setBoard] = useState([
  //       "게임1","게임2","게임3",
  //   ]);
  const toggleButton = () => {
    if (!localStorage.getItem("id")) {
      alert("로그인 하세요 !");
      navigate("/signin");
      return;
    } else {
      likes.current += 1;
    }

    dispatch(__likeToggle(props.posts.id));

    setLikeToggle(!likeToggle);
  };
  return (
    <div className="likes">
      {likeToggle ? (
        <span onClick={toggleButton}>♡</span>
      ) : (
        <span onClick={toggleButton}>♥</span>
      )}
    </div>
  );
}

export default Likes;
