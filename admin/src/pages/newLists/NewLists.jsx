import { useContext, useState } from "react";
import "./newLists.css";

import { MovieContext } from "../../context/movieContext/MovieContext";
import { ListsContext } from "../../context/listsContext/ListsContext";
import { useEffect } from "react";
import { getMovies } from "../../context/movieContext/MoviesApiCalls";
import { createMoviesLists } from "../../context/listsContext/ListsApiCalls";
import { useHistory } from 'react-router-dom'
export default function NewProduct() {
  const { dispatch } = useContext(ListsContext);
  const { movies, dispatch: dispatchLists } = useContext(MovieContext);
  const [list, setList] = useState(null);
  const history = useHistory()
  const handleChange = (e) => {
    setList((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    getMovies(dispatchLists);
  }, [dispatchLists]);

  const handleSelect = (e) => {

    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setList((prev) => {
      return { ...prev, [e.target.name]: value };
    });
  };
  const createList = (e) => {
    e.preventDefault()
    createMoviesLists(list , dispatch)
    history.push('/lists')
  }
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movies Lists</h1>
      <form className="addLists">
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Top Action movies..."
            id="title"
            name="title"
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Action , Romance etc.."
            id="genre"
            name="genre"
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem ">
          <label>Type</label>
          <select name="type" onChange={handleChange}>
            <option>Type</option>
            <option value={"movie"}>Movie</option>
            <option value={"series"}>Series</option>
          </select>
        </div>

        <div className="addProductItem selectoption" 
    
        >
         
          <label> Content</label>
          <select 
          style={{
            height : "180px",
            width : "200px",
            padding : "5px 10px"

          }} 
          multiple name="content" id="content" onChange={handleSelect}>
            {movies?.map((movie) => {
              return (
                <option
                 
                key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              );
            })}
          </select>
 
        </div>

        <button className="addProductButton" onClick={createList}>Publish</button>
      </form>
    </div>
  );
}
