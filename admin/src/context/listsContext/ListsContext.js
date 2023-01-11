import ListsReducer from "./ListsReducer";
import { createContext, useReducer } from "react";
const initialState = {
  lists: [],
  isFetching: false,
  isError: false,
};
export const ListsContext = createContext(initialState);

export const ListsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ListsReducer, initialState);

  return (
    <ListsContext.Provider
      value={{
        lists: state.lists,
        isFetching: state.isFetching,
        isError: state.isError,
        dispatch,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};
