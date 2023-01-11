import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";
export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await axios.get("users?new=true", {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWFjMWU4YzkxODY0YTMyNTNkMTM5YiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MTE3NDczNH0._3qZoikHlSSswVoirk-1hM6-mTB5r88SZuE8CUuXIlc",
        },
      });
      setUsers(res.data);
    };
    getAllUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      {users?.map((user) => {
        return (
          <ul key={user?._id} className="widgetSmList">
            <li className="widgetSmListItem">
              <img
                src={
                  user?.profileImg ||
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAACHCAMAAAALObo4AAAAYFBMVEUNfoD///8Ae30AdngAcnT5/Pzx9/cAbW+Htrfq8/Nfn6DI3d4Aam3e6+u21NXV4+MpiIpypaaEsLFqoaI9jpCuz9CUwMFRmJq+2Nl1ra6nyss0h4hGjpBmp6iPurunw8MaAKz9AAACNklEQVR4nO3Z6ZLqIBAFYNKdkAVNUMnqMu//loPjlqgVoWTudarO98typD0sJoERAgAAAAAAAAAA4MOQ9d8LEutVti4EB0vBYpNlG8FeUdjUMoqiJM9EmDEh3cjEVpSN9ijIbR6ddUFykK4uBSv3IKSjGxViaji/Fczdm3WjHFH//ohQMy44OPaMzLhVpN7PofNxQbl1a8XZJEe0ezcItdOCe7eCcTdt1r6bg/tpwYPbxHxKjl+fF8eVf9ds+WYKaztZp4lx7Vg1buY4inNoGBcsXWNMfrhV6OuYdL+gci+vMZwHcQ7dbhR54dExbtWp1RDoPse6PE+K8RpfikX/9bXnYPd9iskW7EXs2y9i9ntWcKoYtCAAAADAX/IZD0PEu6ELdbZzqhgfHzl92+j6eCgU4AThWtKoKFHG5wmWqb1snNfBgtDPlk82W8cjQPuxXiWXPUwTaonQ5lxTDjp9OSjEqRmW461qqPGg1WjjmZmZHQZxLIpmHMK2CJTC2spRXVllO010H8a+QWK375bJJEVS+hxdvsDraGqpmrXmRRqfpQsyq0bdZThuLFvvLd1sEKHuv+FnF12p0lJV/uyvUV57Hii/RlSoh87OSvK1CXxkf0rCbemRpNw8rKBwSeLeaVDyukiDLosHLEyv8pksiVwOhevl7h32DmqvEOXThSnVsDG/Nh3PssRprFeHoe5UZamuHg4rw4uY/8FI3Ieh63+cji9CH+MAAAAAAAAAAAAAAADAn/MNZQ4UAdq9Rq4AAAAASUVORK5CYII="
                }
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user?.username}</span>
                <span className="widgetSmUserTitle">{user?.email}</span>
              </div>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          </ul>
        );
      })}
    </div>
  );
}
