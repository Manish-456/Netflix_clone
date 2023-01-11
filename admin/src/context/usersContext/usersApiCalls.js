import axios from "axios";
import {
  createUserFailure,
  createUserStart,
  createUserSuccess,
  deleteUsersFailure,
  deleteUsersStart,
  deleteUsersSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
} from "./UsersAction";
export const getAllUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get("users", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUsersStart());
  try {
    await axios.delete(`users/${id}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(deleteUsersSuccess(id));
  } catch (err) {
    dispatch(deleteUsersFailure());
  }
};

export const createUser = async (user, dispatch) => {
  dispatch(createUserStart());
  try {
    const res = await axios.post(`auth/signup`, user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(createUserSuccess(res.data));
  } catch (err) {
    dispatch(createUserFailure());
  }
};
export const updateUser = async (id , user, dispatch) => {
  dispatch(createUserStart());
  try {
    const res = await axios.put(`http://localhost:5000/api/users/${id}`, user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(createUserSuccess(res.data));
  } catch (err) {
    dispatch(createUserFailure());
  }
};
