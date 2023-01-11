import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { ListsContextProvider } from "./context/listsContext/ListsContext";
import { MovieContextProvider } from "./context/movieContext/MovieContext";
import { UsersContextProvider } from "./context/usersContext/UsersContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MovieContextProvider>
        <ListsContextProvider>
          <UsersContextProvider>
            <App />
          </UsersContextProvider>
        </ListsContextProvider>
      </MovieContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
