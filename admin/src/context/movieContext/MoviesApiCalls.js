import axios from "axios";
import {
  deleteMoviesFailure,
  deleteMoviesStart,
  deleteMoviesSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  publishMoviesFailure,
  publishMoviesStart,
  publishMoviesSuccess,
  updateMoviesFailure,
  updateMoviesStart,
  updateMoviesSuccess,
} from "./MovieAction";
export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axios.get("movie" , {
      headers : {
        token : "Bearer " + JSON.parse(localStorage.getItem("user")).token
      }
    });
    dispatch(getMoviesSuccess(res.data));
  } catch (err) {
    dispatch(getMoviesFailure());
  }
};
export const deleteMovies = async (id, dispatch) => {
  dispatch(deleteMoviesStart());
  try {
    await axios.delete(`movie/${id}` , {
      headers : {
        token : "Bearer " + JSON.parse(localStorage.getItem("user")).token
      }
    });
    dispatch(deleteMoviesSuccess(id));
  } catch (err) {
    dispatch(deleteMoviesFailure());
  }
};
export const publishMovies = async (movie, dispatch) => {
  dispatch(publishMoviesStart());
  try {
  const res =  await axios.post(`movie` , movie , {
      headers : {
        token : "Bearer " + JSON.parse(localStorage.getItem("user")).token
      }
    });
    dispatch(publishMoviesSuccess(res.data));
  } catch (err) {
    dispatch(publishMoviesFailure());
  }
};
export const updateMovies = async (id , movie, dispatch) => {
  dispatch(updateMoviesStart());
  try {
  const res =  await axios.put(`http://localhost:5000/api/movie/${id}` , movie , {
      headers : {
        token : "Bearer " + JSON.parse(localStorage.getItem("user")).token
      }
    });
    dispatch(updateMoviesSuccess(res.data));
  } catch (err) {
    dispatch(updateMoviesFailure());
  }
};


