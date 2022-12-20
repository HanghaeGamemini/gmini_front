import { useNavigate } from "react-router-dom";
import { postLogin } from "../lib/queries";
import { useInput } from "../lib/useInput";
// import { useSweet } from "../core/utils/useSweet";
import $ from "jquery";
import "./reset.css";
import "./style.css";
import { useCookies } from "react-cookie";

const SignIn = () => {
  const [username, setUserName] = useInput();
  const [password, setPassword] = useInput();
  const navigation = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    postLogin({
      username, //(post 요소)
      password, //(post 요소)
    })
      .then((res) => {
        console.log(res);
        // useSweet(1000, "success", "로그인 성공");
        // localStorage.setItem("id", res.headers.authorization);
        localStorage.setItem("id", res.headers.authorization);

        //
        // navigation("/");
      })

      //   .catch((error) => useSweet(1000, "error", error.response.data.msg));
      .catch((error) => alert("에러발생"));
  };

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
        <button onClick={() => navigation("/")} className="logbtn">
          Sign In
        </button>

        <button onClick={() => navigation("/signin")}>Sign Out</button>
      </form>

      <div className="bottom_text">
        Don't have account?
        <button onClick={() => navigation("/signup")} className="sign_btn">
          Sign Up
        </button>
      </div>
    </>
  );
};

export default SignIn;
