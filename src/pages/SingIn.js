import { useNavigate } from "react-router-dom";
import { postLogin } from "../lib/queries";
import { useInput } from "../lib/useInput";
// import { useSweet } from "../core/utils/useSweet";
import { useEffect } from "react";
import $ from "jquery";
import "./reset.css";
import "./style.css";

const SignIn = () => {
  const [username, setUserName] = useInput();
  const [password, setPassword] = useInput();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    postLogin({
      username, //(post 요소)
      password, //(post 요소)
    })
      .then((res) => {
        console.log(res);
        if (res.data.statusCode === 200) {
          alert("로그인 완료 :)");
        }
        // useSweet(1000, "success", "로그인 성공");
        // localStorage.setItem("id", res.headers.authorization);
        localStorage.setItem("id", res.headers.authorization);

        //
        navigate("/");
      })

      //   .catch((error) => useSweet(1000, "error", error.response.data.msg));
      .catch((error) => alert("ID 또는 Password가 틀립니다."));
  };

  useEffect(() => {
    $(".txt input").on("focus", function () {
      $(this).addClass("focus");
    });

    $(".txt input").on("blur", function () {
      if ($(this).val() === "") $(this).removeClass("focus");
    });
  });

  return (
    <>
      <form onSubmit={onSubmit} className="login-form">
        <h1 className="logo">
          <a href="/">LOGO</a>
        </h1>
        {/* <label htmlFor="nickname">username : </label> */}
        <div className="txt">
          <input
            type="text"
            id="nickname"
            value={username}
            onChange={setUserName}
          />
          <span data-placeholder="Username"></span>
        </div>
        {/* <label htmlFor="password">password : </label> */}
        <div className="txt">
          <input
            type="password"
            id="password"
            value={password}
            onChange={setPassword}
            autoComplete="off"
          />
          <span data-placeholder="Password"></span>
        </div>
        <button className="logbtn">Sign In</button>
      </form>

      <div className="bottom_text">
        Don't have account?
        <button onClick={() => navigate("/signup")} className="sign_btn">
          Sign Up
        </button>
      </div>
    </>
  );
};

export default SignIn;
