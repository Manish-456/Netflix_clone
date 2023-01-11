import "./MovieLists.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect} from "react";
import { ListsContext } from "../../context/listsContext/ListsContext";
import { deleteListsMovies, getListsMovies } from "../../context/listsContext/ListsApiCalls";

export default function MovieLists() {
 const {lists, dispatch} = useContext(ListsContext)

 useEffect(() => {
  getListsMovies(dispatch)
 }, [dispatch])

  const handleDelete = (id) => {
 deleteListsMovies(id , dispatch)
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    { field: "type", headerName: "Type", width: 120 },
    { field: "genre", headerName: "Genre", width: 120 },
    
    
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname : "/list/" + params.row._id , list : params.row}}>
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
   <div className="Lists">
   <div className="createButton">
   <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link>
   </div>
 <div className="productList">
    
    <DataGrid
      rows={lists}
      getRowId = {id => id._id}
      disableSelectionOnClick
      columns={columns}
      pageSize={8}
      checkboxSelection
    />
  </div>
   </div>
  );
}
