import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { __getPosting, __deletePosting } from "../../redux/modules/postSlice";
import { useEffect } from "react";

function AddPostCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  console.log(props);
  return (
    <div className="cardlist">
      <div key={props.cardList.id}>
        <StDiv CardBoxDiv>
          <div>
            <div
              onClick={function () {
                navigate(`detail/${props.cardList.id}`);
              }}
            >
              <div className="card">
                <img src={props.cardList.imgUrl} alt="cardImg" />
                <div className="card_title">{props.cardList.title}</div>
                <div className="card_body">{props.cardList.content}</div>
              </div>
              <button
                // onClick={() => {
                //   delete_post(id);
                // }}
                onClick={() => {
                  onDeleteHandler(props.cardList.id);
                }}
                className="card_delete_btn"
              >
                삭제{" "}
              </button>
              {/* <주의사항> onClick에 매개변수를 넣는 함수 사용하려면 
          함수이름만 쓰면 안되고, 화살표함수로 사용해야 한다.! 
          WHY? 페이지 이동시 함수가 바로 실행됨. 아래 toggle함수와는 작동방식이 다름!  */}
            </div>
          </div>
        </StDiv>
      </div>
    </div>
  );
}

const StDiv = styled.div`
  ${(props) =>
    props.CardBoxDiv &&
    css`
      width: 325px;
      height: 350px;
      border: 1px solid black;
      color: black;
      overflow: hidden;
    `}
`;
export default AddPostCard;
