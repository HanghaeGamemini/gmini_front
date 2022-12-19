import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __getPosting } from "../redux/modules/postSlice";
import PostingPage from "./PostingPage";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const cardList = useSelector((state) => state.postSlice.post);
  const isLoading = useSelector((state) => state.postSlice.isLoading);
  const dispatch = useDispatch();
  // const params = useParams();
  console.log(cardList);
  console.log(isLoading);

  useEffect(() => {
    dispatch(__getPosting());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩중입니다</div>;
  }

  return (
    <div>
      메인 홈페이지입니다.
      <div>
        <section>
          <button
            onClick={() => {
              navigate("/posting");
            }}
          >
            글쓰기
          </button>
          {cardList.map((cList) => {
            console.log(cList);
            return (
              <div className="cardBox" key={cList.id}>
                <div>
                  {/* <div
                  onClick={function () {
                    navigate(`detail/${params.id}`);
                  }}
                > */}
                  <div>
                    <div>제목 : {cList.title}</div>
                    <div>내용 : {cList.contents}</div>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
