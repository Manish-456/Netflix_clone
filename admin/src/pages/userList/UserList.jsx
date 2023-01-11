import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../context/usersContext/UsersContext";
import { useEffect } from "react";
import { deleteUser, getAllUsers } from "../../context/usersContext/usersApiCalls";

export default function UserList() {
  const { users, dispatch } = useContext(UsersContext);

  useEffect(() => {
    getAllUsers(dispatch);
  }, [dispatch]);
  const handleDelete = (id) => {
   deleteUser(id , dispatch)
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "username",
      headerName: "Users",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={
                params.row.profileImg ||
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAACHCAMAAAALObo4AAAAYFBMVEUNfoD///8Ae30AdngAcnT5/Pzx9/cAbW+Htrfq8/Nfn6DI3d4Aam3e6+u21NXV4+MpiIpypaaEsLFqoaI9jpCuz9CUwMFRmJq+2Nl1ra6nyss0h4hGjpBmp6iPurunw8MaAKz9AAACNklEQVR4nO3Z6ZLqIBAFYNKdkAVNUMnqMu//loPjlqgVoWTudarO98typD0sJoERAgAAAAAAAAAA4MOQ9d8LEutVti4EB0vBYpNlG8FeUdjUMoqiJM9EmDEh3cjEVpSN9ijIbR6ddUFykK4uBSv3IKSjGxViaji/Fczdm3WjHFH//ohQMy44OPaMzLhVpN7PofNxQbl1a8XZJEe0ezcItdOCe7eCcTdt1r6bg/tpwYPbxHxKjl+fF8eVf9ds+WYKaztZp4lx7Vg1buY4inNoGBcsXWNMfrhV6OuYdL+gci+vMZwHcQ7dbhR54dExbtWp1RDoPse6PE+K8RpfikX/9bXnYPd9iskW7EXs2y9i9ntWcKoYtCAAAADAX/IZD0PEu6ELdbZzqhgfHzl92+j6eCgU4AThWtKoKFHG5wmWqb1snNfBgtDPlk82W8cjQPuxXiWXPUwTaonQ5lxTDjp9OSjEqRmW461qqPGg1WjjmZmZHQZxLIpmHMK2CJTC2spRXVllO010H8a+QWK375bJJEVS+hxdvsDraGqpmrXmRRqfpQsyq0bdZThuLFvvLd1sEKHuv+FnF12p0lJV/uyvUV57Hii/RlSoh87OSvK1CXxkf0rCbemRpNw8rKBwSeLeaVDyukiDLosHLEyv8pksiVwOhevl7h32DmqvEOXThSnVsDG/Nh3PssRprFeHoe5UZamuHg4rw4uY/8FI3Ieh63+cji9CH+MAAAAAAAAAAAAAAADAn/MNZQ4UAdq9Rq4AAAAASUVORK5CYII="
              }
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },

   
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
   <div className="usersTable">
    <div className="createBtn">
    <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
    </div>
    <div className="userLists">
      <DataGrid
        rows={users}
        getRowId={(id) => id._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
   </div>
  );
}
