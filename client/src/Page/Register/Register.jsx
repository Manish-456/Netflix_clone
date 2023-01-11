import axios from "axios";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";

const Register = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [isEmail, setIsEmail] = useState(false);
  const [inputs, setInputs] = useState({});
  const emailHandler = (e) => {
    e.preventDefault();

    setInputs((prev) => {
      return { ...prev, email };
    });
    setIsEmail(true);
  };

  useEffect(() => {
    setInputs((prev) => {
      return { ...prev, username, password };
    });
  }, [username, password]);

  const passwordHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("auth/signup", inputs);
      navigate('/login')
    } catch (err) {
      console.log(err);
    }
  };

  const clickHandler = () => {
    navigate("/login");
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <button className="loginButton" onClick={clickHandler} type="button">
            {" "}
            Sign In
          </button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!isEmail ? (
          <div className="input">
            <input
              type="email"
              placeholder="email address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="registerButton" onClick={emailHandler}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              type="username"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="new-password"
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <button className="registerButton" onClick={passwordHandler}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
