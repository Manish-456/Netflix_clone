import "./Navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useContext, useState } from "react";

import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from "../../redux/authContext/AuthContext";
import { LogOut } from "../../redux/authContext/AuthAction";
const Navbar = () => {
  const navigate = useNavigate()
 const [isScrolled , setIsScrolled] = useState(false)
 const {dispatch} = useContext(AuthContext)
 window.onscroll = () => {
  setIsScrolled(window.pageYOffset == 0 ? false : true)
  return () => {window.onscroll = null}
 }

 const logoutHandler = () => {
 dispatch(LogOut())
 navigate('/login')
 }
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt="logo"
          />
         <Link  className="link " to={'/'} ><span className="tablink">Home</span></Link> 
          <Link className="link "  to={'/movies'} ><span className="tablink">Movies</span></Link>
          <Link className="link "  to={'/series'} ><span className="tablink">Series</span></Link>
          <Link className="link"  to={'/'} ><span>New And Popular</span></Link>
          <Link className="link" ><span>My Lists</span></Link>
        </div>
        <div className="right">
          <SearchIcon />
          <span>KID</span>
          <NotificationsIcon className="icon" />
          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="profile"
          />

          <div className="profile">
            <ArrowDropDownIcon className="icon" />
            <div className="options">
              <span>Setting</span>
              <span onClick={logoutHandler}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
