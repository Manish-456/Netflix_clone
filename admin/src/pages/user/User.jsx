import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  Publish,
} from "@material-ui/icons";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../Firebase";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./user.css";
import { UsersContext } from "../../context/usersContext/UsersContext";
import { updateUser } from "../../context/usersContext/usersApiCalls";

export default function User() {
  const{dispatch} = useContext(UsersContext)
  const history = useHistory()
  const location = useLocation();
  const id = location.pathname?.split("/")[2];
  const [user, setUser] = useState({});
  const token = JSON.parse(localStorage.getItem("user")).token;
  const [inputs, setInputs] = useState({});
  const [img, setImg] = useState(null);
  const [isUploaded , setIsUploaded] = useState(false)
  const changeInputs = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    const getSingleUsers = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/users/find/${id}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setUser(res?.data);
    };
    getSingleUsers();
  }, [id, token]);

  const uploadFile = (file, imgUrl) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file?.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progress === 100 && setIsUploaded(true)
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [imgUrl]: downloadURL };
          });
        });
      }
    );
  };
  useEffect(() => {
    img && uploadFile(img, "profileImg");
  }, [img]);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser(id , inputs , dispatch)
    history.push('/users')

  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={
                user?.profileImg ||
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAACHCAMAAAALObo4AAAAYFBMVEUNfoD///8Ae30AdngAcnT5/Pzx9/cAbW+Htrfq8/Nfn6DI3d4Aam3e6+u21NXV4+MpiIpypaaEsLFqoaI9jpCuz9CUwMFRmJq+2Nl1ra6nyss0h4hGjpBmp6iPurunw8MaAKz9AAACNklEQVR4nO3Z6ZLqIBAFYNKdkAVNUMnqMu//loPjlqgVoWTudarO98typD0sJoERAgAAAAAAAAAA4MOQ9d8LEutVti4EB0vBYpNlG8FeUdjUMoqiJM9EmDEh3cjEVpSN9ijIbR6ddUFykK4uBSv3IKSjGxViaji/Fczdm3WjHFH//ohQMy44OPaMzLhVpN7PofNxQbl1a8XZJEe0ezcItdOCe7eCcTdt1r6bg/tpwYPbxHxKjl+fF8eVf9ds+WYKaztZp4lx7Vg1buY4inNoGBcsXWNMfrhV6OuYdL+gci+vMZwHcQ7dbhR54dExbtWp1RDoPse6PE+K8RpfikX/9bXnYPd9iskW7EXs2y9i9ntWcKoYtCAAAADAX/IZD0PEu6ELdbZzqhgfHzl92+j6eCgU4AThWtKoKFHG5wmWqb1snNfBgtDPlk82W8cjQPuxXiWXPUwTaonQ5lxTDjp9OSjEqRmW461qqPGg1WjjmZmZHQZxLIpmHMK2CJTC2spRXVllO010H8a+QWK375bJJEVS+hxdvsDraGqpmrXmRRqfpQsyq0bdZThuLFvvLd1sEKHuv+FnF12p0lJV/uyvUV57Hii/RlSoh87OSvK1CXxkf0rCbemRpNw8rKBwSeLeaVDyukiDLosHLEyv8pksiVwOhevl7h32DmqvEOXThSnVsDG/Nh3PssRprFeHoe5UZamuHg4rw4uY/8FI3Ieh63+cji9CH+MAAAAAAAAAAAAAAADAn/MNZQ4UAdq9Rq4AAAAASUVORK5CYII="
              }
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user?.username}</span>
              <span className="userShowUserTitle">{user?.email}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user?._id}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.createdAt}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>

            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder={user?.username}
                  className="userUpdateInput"
                  onChange={changeInputs}
                />
              </div>

              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder={user?.email}
                  className="userUpdateInput"
                  onChange={changeInputs}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={
                    user?.profileImg ||
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAACHCAMAAAALObo4AAAAYFBMVEUNfoD///8Ae30AdngAcnT5/Pzx9/cAbW+Htrfq8/Nfn6DI3d4Aam3e6+u21NXV4+MpiIpypaaEsLFqoaI9jpCuz9CUwMFRmJq+2Nl1ra6nyss0h4hGjpBmp6iPurunw8MaAKz9AAACNklEQVR4nO3Z6ZLqIBAFYNKdkAVNUMnqMu//loPjlqgVoWTudarO98typD0sJoERAgAAAAAAAAAA4MOQ9d8LEutVti4EB0vBYpNlG8FeUdjUMoqiJM9EmDEh3cjEVpSN9ijIbR6ddUFykK4uBSv3IKSjGxViaji/Fczdm3WjHFH//ohQMy44OPaMzLhVpN7PofNxQbl1a8XZJEe0ezcItdOCe7eCcTdt1r6bg/tpwYPbxHxKjl+fF8eVf9ds+WYKaztZp4lx7Vg1buY4inNoGBcsXWNMfrhV6OuYdL+gci+vMZwHcQ7dbhR54dExbtWp1RDoPse6PE+K8RpfikX/9bXnYPd9iskW7EXs2y9i9ntWcKoYtCAAAADAX/IZD0PEu6ELdbZzqhgfHzl92+j6eCgU4AThWtKoKFHG5wmWqb1snNfBgtDPlk82W8cjQPuxXiWXPUwTaonQ5lxTDjp9OSjEqRmW461qqPGg1WjjmZmZHQZxLIpmHMK2CJTC2spRXVllO010H8a+QWK375bJJEVS+hxdvsDraGqpmrXmRRqfpQsyq0bdZThuLFvvLd1sEKHuv+FnF12p0lJV/uyvUV57Hii/RlSoh87OSvK1CXxkf0rCbemRpNw8rKBwSeLeaVDyukiDLosHLEyv8pksiVwOhevl7h32DmqvEOXThSnVsDG/Nh3PssRprFeHoe5UZamuHg4rw4uY/8FI3Ieh63+cji9CH+MAAAAAAAAAAAAAAADAn/MNZQ4UAdq9Rq4AAAAASUVORK5CYII="
                  }
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  onChange={(e) => setImg(e.target.files[0])}
                  name="profileImg"
                  id="file"
                  style={{ display: "none" }}
                />
              </div>
              <button
                className="userUpdateButton"
                disabled = {!isUploaded}
                style={{
                  marginTop: "20px",
                }}
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
