import { useContext, useState, useEffect } from "react";
import {useHistory} from 'react-router-dom'
import "./newUser.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../Firebase";
import { UsersContext } from "../../context/usersContext/UsersContext";
import { createUser } from "../../context/usersContext/usersApiCalls";

export default function NewUser() {
  const [inputs, setInputs] = useState({});
  const history= useHistory()
  const [img , setImg] = useState(null)
  const {dispatch} = useContext(UsersContext)
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const uploadFile = (file , imgUrl) => {
    
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file?.name;
      const storageRef = ref(storage, fileName);
      
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
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
  img && uploadFile(img , "profileImg")
 }, [img])

 const createSingleUser = () => {
   createUser(inputs , dispatch)
   history.push('/users')

 }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            onChange={handleChange}
            name="username"
            autoComplete="new-password"
            placeholder="john"
          
          />
        </div>

        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            onChange={handleChange}
            name="email"
            
            autoComplete="new-password"
            placeholder="email@example.com"
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
           
            onChange={handleChange}
            name="password"
            autoComplete="new-password"
            placeholder="password"
          />
        </div>
        <div className="newUserItem">
          <label>Profile Picture</label>
          <input
            style={{
              border: "none",
              outline: "none",
            }}
            type="file"
            onChange={e => setImg(e.target.files[0])}
            name="profileImg"
            id="profileImg"
          />
        </div>
        <button className="newUserButton" onClick={createSingleUser}>create</button>
      </form>
    </div>
  );
}
