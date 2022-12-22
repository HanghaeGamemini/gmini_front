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
import { bg1 } from "../assets";
import { bg2 } from "../assets";

// import AddComment from "../components/Comment/AddComment";

const HomePage = () => {
  const navigate = useNavigate();
  // const cardList = useSelector((state) => state.postSlice.post);
  const {
    isLoading,
    isSuccess,
    post: cardList,
  } = useSelector((state) => state.postSlice);
  const dispatch = useDispatch();
  // const params = useParams();
  // const cards = cardList.data;
  // const cards = card.postList;

  // console.log("cards :", cards);
  // console.log("cardList: ", cardList.data.postList);
  console.log(isLoading);
  console.log(isSuccess);

  useEffect(() => {
    dispatch(__getPosting());
  }, [dispatch]);
  if (cardList !== undefined) {
    console.log(cardList);
  }

  // useEffect(() => {
  //   console.log(123);
  // }, [dispatch, isSuccess]);

  if (isLoading) {
    return (
      <div className="loading">
        <Lottie animationData={loading} />
      </div>
    );
  }
  if (isSuccess === true) {
    return (
      <div className="inner">
        <div className="bg">
          <Lottie animationData={bg2} />
        </div>
        <div className="headerwrap">
          <h1 className="logo">
            <a href="/">LOGO</a>
          </h1>
          <nav className="gnb">
            <ul className="clearfix">
              {!localStorage.getItem("id") ? (
                <li onClick={() => navigate("/signin")} className="signin">
                  Sign In
                </li>
              ) : (
                <li
                  onClick={() => {
                    localStorage.removeItem("id");
                    navigate("/signin");
                  }}
                  className="signin"
                >
                  Sign Out
                </li>
              )}

              <li onClick={() => navigate("/signup")} className="signup">
                Sign Up
              </li>
              <li className="mypage">My page</li>
            </ul>
          </nav>
        </div>
        <div className="heroside">
          <h1 className="blink">GAMMINI</h1>
          <h3>Press BUTTON to start</h3>
          <div
            onClick={() => {
              if (!localStorage.getItem("id")) {
                alert("로그인 하세요 !");
                return navigate("/signin");
              }
              navigate("/posting");
            }}
            className="hero_btn"
          >
            BUTTON
          </div>
        </div>
        <div className="section1">
          <h3>여기에 뭐가 들어가는 게 좋을까요 ..</h3>
          <div className="cardwrap">
            {cardList.map((cList) => {
              console.log(cList);
              return (
                <div className="cardbox">
                  <AddPostCard cardList={cList} className="card"></AddPostCard>
                </div>
              );
            })}
            {/* <주의사항> onClick에 매개변수를 넣는 함수사용하려면
            함수이름만 쓰면 안되고, 화살표함수로 사용해야 한다.!
            WHY? 페이지 이동시 함수가 바로 실행됨. 아래 toggle함수와는 작동방식이 다름!  */}
            {/* </div> */}
            {/* </div>
                </div>
              );
            })} */}
          </div>
        </div>
      </div>
    );
  }
};
export default HomePage;
