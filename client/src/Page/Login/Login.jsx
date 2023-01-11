import { useContext, useState } from "react";
import { loginUser } from "../../apiCalls";
import { AuthContext } from "../../redux/authContext/AuthContext";
import { Link } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({});
  const { user, dispatch } = useContext(AuthContext);
  const changeInputs = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const loginHandler = (e) => {
    e.preventDefault();
    loginUser(inputs, dispatch);
  };
  console.log(user);
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt="logo"
            className="logo"
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="new-password"
            placeholder="Email or phone number"
            onChange={changeInputs}
          />
          <input
            type="password"
            autoComplete="new-password"
            name="password"
            id="password"
            onChange={changeInputs}
            placeholder="Password"
          />
          <button className="signInButton" onClick={loginHandler}>
            Sign In
          </button>
          <span>
            New to Netflix?{" "}
            <Link
              to="/register"
              style={{
                textDecoration: "none",
              }}
            >
              <strong
                style={{
                  color: "blue",
                  textDecoration: "none",
                }}
                className="signupnow"
              >
                {" "}
                Sign up now.
              </strong>
            </Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <strong className="strong">Learn more.</strong>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
