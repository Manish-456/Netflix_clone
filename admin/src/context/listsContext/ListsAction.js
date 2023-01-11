export const getListsMoviesStart = () => ({
  type: "GET_LISTS_MOVIES_START",
});
export const getListsMoviesSuccess = (lists) => ({
  type: "GET_LISTS_MOVIES_SUCCESS",
  payload: lists,
});
export const getListsMoviesFailure = () => ({
  type: "GET_LISTS_MOVIES_FAILURE",
});
export const createMoviesListsStart = () => ({
  type: "CREATE_MOVIES_LISTS_START",
});
export const createMoviesListsSuccess = (lists) => ({
  type: "CREATE_MOVIES_LISTS_SUCCESS",
  payload: lists,
});
export const createMoviesListsFailure = () => ({
  type: "CREATE_MOVIES_LISTS_FAILURE",
});
export const updateMoviesListsStart = () => ({
  type: "UPDATE_MOVIES_LISTS_START",
});
export const updateMoviesListsSuccess = (lists) => ({
  type: "UPDATE_MOVIES_LISTS_SUCCESS",
  payload: lists,
});
export const updateMoviesListsFailure = () => ({
  type: "UPDATE_MOVIES_LISTS_FAILURE",
});
export const deleteListsMoviesStart = () => ({
  type: "DELETE_LISTS_MOVIES_START",
});
export const deleteListsMoviesSuccess = (id) => ({
  type: "DELETE_LISTS_MOVIES_SUCCESS",
  payload: id,
});
export const deleteListsMoviesFailure = () => ({
  type: "DELETE_LISTS_MOVIES_FAILURE",
});
