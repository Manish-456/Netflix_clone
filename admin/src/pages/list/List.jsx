import { useContext, useEffect } from "react";
import { useState } from "react";
import {  useHistory, useLocation } from "react-router-dom";
import { updateMovieLists } from "../../context/listsContext/ListsApiCalls";
import { ListsContext } from "../../context/listsContext/ListsContext";
import axios from "axios"
import "./list.css";

export default function Product() {
  const location = useLocation();
  const id = location.pathname?.split("/")[2]
  const { dispatch } = useContext(ListsContext);
   const [list , setList] = useState({})
  const [inputs, setInputs] = useState({});
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem('user')).token
  const [type, setType] = useState(null);
  const handleInputs = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
 
  useEffect(() => {
  const getLists = async() => {
    const res = await axios.get(`http://localhost:5000/api/lists/find/${id}`, {
     headers : {
      token : `Bearer ${token}`,
     }
    })
    setList(res?.data)
  }
  getLists()
  }, [token , id])

  useEffect(() => {
    setInputs((prev) => {
      return { ...prev, type: type };
    });
  }, [type]);

  const createLists = (e, id) => {
    e.preventDefault();
    updateMovieLists(id, inputs, dispatch);
    history.push("/lists");
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Lists</h1>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list?.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">_id:</span>
              <span className="productInfoValue">{list?._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{list?.genre}</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">Type:</span>
              <span className="productInfoValue">{list?.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            <input
              type="text"
              name="title"
              onChange={handleInputs}
              placeholder={list?.title}
            />
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              onChange={handleInputs}
              placeholder={list?.genre}
            />
            <label>Type</label>
            <select onChange={(e) => setType(e.target.value)}>
              <option>Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
          <div className="productFormRight">
            <button
              className="productButton"
              onClick={(e) => createLists(e, list?._id)}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
