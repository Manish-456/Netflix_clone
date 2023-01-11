import axios from "axios";
import {
  createMoviesListsFailure,
  createMoviesListsStart,
  createMoviesListsSuccess,
  deleteListsMoviesFailure,
  deleteListsMoviesStart,
  deleteListsMoviesSuccess,
  getListsMoviesFailure,
  getListsMoviesStart,
  getListsMoviesSuccess,
  updateMoviesListsFailure,
  updateMoviesListsStart,
  updateMoviesListsSuccess,
} from "./ListsAction";

export const getListsMovies = async (dispatch) => {
  dispatch(getListsMoviesStart());
  try {
    const res = await axios.get("lists", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(getListsMoviesSuccess(res.data));
  } catch (err) {
    dispatch(getListsMoviesFailure());
  }
};
export const createMoviesLists = async (lists ,dispatch) => {
  dispatch(createMoviesListsStart());
  try {
    const res = await axios.post("lists", lists, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(createMoviesListsSuccess(res.data));
  } catch (err) {
    dispatch(createMoviesListsFailure());
  }
};

export const updateMovieLists = async(id , lists , dispatch) => {
  dispatch(updateMoviesListsStart())
  try {
    const res = await axios.put(`http://localhost:5000/api/lists/upd/${id}` , lists , {
      headers : {
        token : "Bearer " + JSON.parse(localStorage.getItem("user")).token
      }
    })
    dispatch(updateMoviesListsSuccess(res?.data))
  } catch (err) {
    dispatch(updateMoviesListsFailure())
  }
}



export const deleteListsMovies = async (id, dispatch) => {
  dispatch(deleteListsMoviesStart());
  try {
    await axios.delete(`lists/${id}` , {
      headers : {
        token : "Bearer " + JSON.parse(localStorage.getItem("user")).token
      }
    });

    dispatch(deleteListsMoviesSuccess(id));
  } catch (err) {
    dispatch(deleteListsMoviesFailure());
  }
};