import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __getPosting, __deletePosting } from "../redux/modules/postSlice";
import PostingPage from "./PostingPage";
import "./HomePage.css";
// import AddComment from "../components/Comment/AddComment";

const HomePage = () => {
  const navigate = useNavigate();
  const cardList = useSelector((state) => state.postSlice.post);
  const isLoading = useSelector((state) => state.postSlice.isLoading);
  const dispatch = useDispatch();
  const params = useParams();
  console.log(cardList);
  console.log(isLoading);

  const delete_post = (id) => {
    if (window.confirm("post를 삭제하시겠습니까?")) {
      console.log(id);
      dispatch(__deletePosting(id));
      navigate("/");
    }
  };

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
                  <button
                    onClick={() => {
                      delete_post(cList.id);
                    }}
                  >
                    삭제{" "}
                  </button>
                  {/* <주의사항> onClick에 매개변수를 넣는 함수 사용하려면 
          함수이름만 쓰면 안되고, 화살표함수로 사용해야 한다.! 
          WHY? 페이지 이동시 함수가 바로 실행됨. 아래 toggle함수와는 작동방식이 다름!  */}

                  {/* </div> */}
                </div>
              </div>
            );
          })}
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
    </div>
  );
};

export default HomePage;
