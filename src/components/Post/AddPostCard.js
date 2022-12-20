import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __deletePosting } from "../../redux/modules/postSlice";
import { apis } from "../../lib/axios";

function AddPostCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cardList = useSelector((state) => state.postSlice.post);

  //   const delete_post = (id) => {
  //     if (window.confirm("post를 삭제하시겠습니까?")) {
  //       console.log(id);
  //       dispatch(__deletePosting(id));
  //       navigate("/");
  //     }
  //   };

  const onDeleteHandler = (id) => {
    console.log("이거 아이디 : ", id);
    if (window.confirm("post를 삭제하시겠습니까?")) {
      console.log(id);
      dispatch(__deletePosting(id));
      //   navigate("/");
    }

    // apis
    //   .deletePost(id, post)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div>
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
                // onClick={() => {
                //   delete_post(cList.id);
                // }}
                onClick={() => {
                  onDeleteHandler(cList.id);
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
    </div>
  );
}

export default AddPostCard;
