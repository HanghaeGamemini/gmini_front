import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Likes() {
  const navigate = useNavigate();
  const [likeToggle, setLikeToggle] = useState(false);
  //     let [board, setBoard] = useState([
  //       "게임1","게임2","게임3",
  //   ]);
  const toggleButton = () => {
    if (!localStorage.getItem("id")) {
      alert("로그인 하세요 !");
      return navigate("/signin");
    }

    setLikeToggle(!likeToggle);
  };
  return (
    <div>
      {likeToggle ? (
        <span onClick={toggleButton}>♡</span>
      ) : (
        <span onClick={toggleButton}>♥</span>
      )}
      {/* 데이터 count 받기  */}
    </div>
  );
}

export default Likes;
