import { useNavigate } from "react-router-dom";
import { postSignup } from "../lib/queries";
import { useInput } from "../lib/useInput";
import { useEffect } from "react";
import $ from "jquery";

const SignUp = () => {
  const [username, setUserName] = useInput();
  const [nickname, setNickName] = useInput();
  const [password, setPassword] = useInput();
  const [passwordCheck, setPasswordCheck] = useInput();

  const navigation = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    postSignup({
      username,
      nickname,
      password,
      passwordCheck,
    })
      .then((res) => {
        if (res.data.statusCode === 200) {
          alert("회원가입 완료 :)");
        }
        navigation("/Signin");
      })
      .catch((err) => {
        // console.log(err);
      }); // Error 출력 });;
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
      {/* <form onSubmit={onSubmit}>
        <label htmlFor="username">username : </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={setUserName}
        />
        <label htmlFor="nickname">nickname : </label>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={setNickName}
        />
        <label htmlFor="password">password : </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={setPassword}
          autoComplete="off"
        />
        <label htmlFor="password-check">password-Check : </label>
        <input
          type="password"
          id="password"
          value={passwordCheck}
          onChange={setPasswordCheck}
          autoComplete="off"
        /> */}

      <form onSubmit={onSubmit} className="login-form">
        <h1 className="logo">
          <a href="/">LOGO</a>
        </h1>

        <div className="txt">
          {/* <label htmlFor="nickname">username : </label> */}
          <input
            type="text"
            id="nickname"
            value={username}
            onChange={setUserName}
          />
          <span data-placeholder="Username"></span>
        </div>

        <div className="txt">
          {/* <label htmlFor="nickname">username : </label> */}
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={setNickName}
          />
          <span data-placeholder="Nickname"></span>
        </div>

        <div className="txt">
          {/* <label htmlFor="password">password : </label> */}
          <input
            type="password"
            id="password"
            value={password}
            onChange={setPassword}
            autoComplete="off"
          />
          <span data-placeholder="Password"></span>
        </div>

        <div className="txt">
          {/* <label htmlFor="password-check">password-Check : </label> */}
          <input
            type="password"
            id="password"
            value={passwordCheck}
            onChange={setPasswordCheck}
            autoComplete="off"
          />
          <span data-placeholder="Password Confirm"></span>
        </div>

        <button className="logbtn">Sign Up</button>
        <button onClick={() => navigation("/signin")} className="signin_btn">
          Sign In
        </button>
      </form>
    </>
  );
};

export default SignUp;
