import UsersReducer from "./UsersReducer";
import { createContext, useReducer } from "react";
const initialState = {
  users: [],
  isFetching: false,
  isError: false,
};
export const UsersContext = createContext(initialState);

export const UsersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UsersReducer, initialState);

  return (
    <UsersContext.Provider
      value={{
        users: state.users,
        isFetching: state.isFetching,
        isError: state.isError,
        dispatch,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
