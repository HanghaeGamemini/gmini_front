import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __getPosting, __deletePosting } from "../redux/modules/postSlice";
import PostingPage from "./PostingPage";
import AddPostCard from "../components/Post/AddPostCard";
import "./reset.css";
import "./HomePage.css";
import Lottie from "lottie-react";
import { loading } from "../assets";
// import AddComment from "../components/Comment/AddComment";

const HomePage = () => {
  const navigate = useNavigate();
  const cardList = useSelector((state) => state.postSlice.post);
  const isLoading = useSelector((state) => state.postSlice.isLoading);
  const dispatch = useDispatch();
  const params = useParams();
  console.log(cardList);
  console.log(isLoading);

  useEffect(() => {
    dispatch(__getPosting());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div>
        <Lottie animationData={loading} />
      </div>
    );
  }

  return (
    <div className="inner">
      <div className="headerwrap">
        <h1 className="logo">
          <a href="/">LOGO</a>
        </h1>
      </div>
      <nav className="gnb">
        <ul className="clearfix">
          <li className="signin">Sign In</li>
          <li className="signup">Sign Up</li>
        </ul>
      </nav>
      <div className="heroside">
        <h3>Press BUTTON to start</h3>
        <div className="hero_btn">BUTTON</div>
      </div>
      <section>
        <button
          onClick={() => {
            navigate("/posting");
          }}
        >
          글쓰기
        </button>
        <AddPostCard />

        {/* <주의사항> onClick에 매개변수를 넣는 함수사용하려면 
          함수이름만 쓰면 안되고, 화살표함수로 사용해야 한다.! 
          WHY? 페이지 이동시 함수가 바로 실행됨. 아래 toggle함수와는 작동방식이 다름!  */}

        {/* </div> */}
        {/* </div>
              </div>
            );
          })} */}
      </section>
      <br />
      <div>
        comment
        <div>
          <input />
          <button>댓글달기</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
