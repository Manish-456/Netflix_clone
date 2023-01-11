import { useContext } from "react";
import { useState } from "react";
import { loginUser } from "../../apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./Login.css";
const Login = () => {
 const [email , setEmail] = useState("")
 const [password , setPassword] = useState("")
 const {isFetching , error, dispatch} = useContext(AuthContext)
 const loginHandler = (e) => {
  e.preventDefault()
  loginUser({email , password} , dispatch)
 }

  return <div className="login">
   <form onSubmit={loginHandler} className="LoginForm">
    <input type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}  className="Input" autoComplete="off" />
    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}  className="Input"  autoComplete="new-password" />
    <button type="submit" className="submitBtn" disabled={isFetching} >Login</button>
   {error && <small className="smText">Wrong email or password</small>}
   
   </form>
  </div>;
};
export default Login;
