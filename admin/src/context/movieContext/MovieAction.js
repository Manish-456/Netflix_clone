export const getMoviesStart = () => ({
  type: "GET_MOVIES_START",
});
export const getMoviesSuccess = (movies) => ({
  type: "GET_MOVIES_SUCCESS",
  payload: movies,
});
export const getMoviesFailure = () => ({
  type: "GET_MOVIES_FAILURE",
});
export const publishMoviesStart = () => ({
  type: "PUBLISH_MOVIES_START",
});
export const publishMoviesSuccess = (movies) => ({
  type: "PUBLISH_MOVIES_SUCCESS",
  payload: movies,
});
export const publishMoviesFailure = () => ({
  type: "UPDATE_MOVIES_FAILURE",
});
export const updateMoviesStart = () => ({
  type: "UPDATE_MOVIES_START"
});
export const updateMoviesSuccess = (movies) => ({
  type: "UPDATE_MOVIES_SUCCESS",
  payload: movies,
});
export const updateMoviesFailure = () => ({
  type: "PUBLISH_MOVIES_FAILURE",
});
export const deleteMoviesStart = () => ({
  type: "DELETE_MOVIES_START",
});
export const deleteMoviesSuccess = (id) => ({
  type: "DELETE_MOVIES_SUCCESS",
  payload: id,
});
export const deleteMoviesFailure = () => ({
  type: "DELETE_MOVIES_FAILURE",
});
