import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import MovieCreationOutlinedIcon from "@material-ui/icons/MovieCreationOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import ListIcon from "@material-ui/icons/List";
import { LogOut } from "../../context/authContext/AuthAction";

export default function Sidebar() {
  const location = useLocation();
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const logoutHandler = () => {
    dispatch(LogOut());
    history.push("/login");
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li
                className={
                  location.pathname === "/"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
              >
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/usersList" className="link">
              <li
                className={
                  location.pathname === "/usersList"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
              >
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/movies" className="link">
              <li
                className={
                  location.pathname === "/movies"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
              >
                <MovieCreationOutlinedIcon className="sidebarIcon" />
                Movies
              </li>
            </Link>
            <Link to={"/movielists"} className="link">
              <li
                className={
                  location.pathname === "/movielists"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
              >
                <ListIcon className="sidebarIcon" />
                Lists
              </li>
            </Link>
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
            <li className="sidebarListItem">
              <ExitToAppOutlinedIcon
                onClick={logoutHandler}
                className="sidebarIcon"
              />
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
