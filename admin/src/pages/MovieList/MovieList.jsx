import "./MovieList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useEffect } from "react";
import {
  deleteMovies,
  getMovies,
} from "../../context/movieContext/MoviesApiCalls";

export default function MovieList() {
  const { movies, dispatch } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteMovies(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },
    { field: "limit", headerName: "Limit", width: 120 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/movie/" + params.row._id}}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="newMovie">
      <div className="createBtn">
        <Link to="/newMovie">
          <button className="productAddButton">Create</button>
        </Link>{" "}
      </div>
      <div className="productList">
        <DataGrid
          rows={movies}
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
