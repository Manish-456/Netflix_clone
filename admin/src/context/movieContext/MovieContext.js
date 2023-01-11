import MovieReducer from "./MovieReducer";
import { createContext, useReducer } from "react";
const initialState = {
  movies: [],
  isFetching: false,
  isError: false,
};
export const MovieContext = createContext(initialState);

export const MovieContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MovieReducer, initialState);

  return (
    <MovieContext.Provider
      value={{
        movies: state.movies,
        isFetching: state.isFetching,
        isError: state.isError,
        dispatch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
