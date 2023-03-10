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
                alert("????????? ????????? !");
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
          <h3>Gammin's Recommend</h3>
          <div className="cardwrap">
            {cardList.map((cList) => {
              console.log(cList);
              return (
                <div className="cardbox">
                  <AddPostCard cardList={cList} className="card"></AddPostCard>
                </div>
              );
            })}
            {/* <????????????> onClick??? ??????????????? ?????? ?????????????????????
            ??????????????? ?????? ?????????, ?????????????????? ???????????? ??????.!
            WHY? ????????? ????????? ????????? ?????? ?????????. ?????? toggle???????????? ??????????????? ??????!  */}
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
