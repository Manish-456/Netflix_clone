import { useHistory, useLocation } from "react-router-dom";
import "./movie.css";
import { Publish } from "@material-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../Firebase";
import { updateMovies } from "../../context/movieContext/MoviesApiCalls";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
export default function Movie() {
  const location = useLocation();
  const id = location.pathname.split('/')[2]
 const [movie , setMovie] = useState([])
  const {dispatch} = useContext(MovieContext)
  const [inputs, setInputs] = useState({});
  const [trailor, setTrailor] = useState(null);
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [isUploaded , setIsUploaded] = useState(false)
  const history = useHistory()
  const token = JSON.parse(localStorage.getItem("user")).token;
  useEffect(() => {
     const getSingleMovie = async() => {
      const res = await axios.get(`http://localhost:5000/api/movie/find/${id}` , {
        headers : {
          token : `Bearer ${token}`
        }
      })
      setMovie(res.data)
     }
     getSingleMovie()
  }, [id , token])
 

  const changeInputs = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const uploadFiles = (file, fileURL) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file?.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progress === 100 && setIsUploaded(true)
        },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [fileURL]: downloadURL };
          });
        });
      }
    );
  };
  useEffect(() => {
    img && uploadFiles(img, "img");
  }, [img]);
  useEffect(() => {
    video && uploadFiles(video, "video");
  }, [video]);
  useEffect(() => {
    trailor && uploadFiles(trailor, "trailor");
  }, [trailor]);

  const updateHandler = (e) => {
    e.preventDefault();
    updateMovies(id , inputs , dispatch)
    history.push('/movies')
  }
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle"></h1>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie?.img} className="productInfoImg" alt="" />
            <div className="movieDet" style={{
              display : "flex",
              flexDirection : "column",
              gap : "20px"
            }}>
              <span className="productName">{movie?.title}</span>
              <span className="productDetail">{movie?.desc}</span>
            </div>
          </div>

          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">_id:</span>
              <span className="productInfoValue">{movie?._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{movie?.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Year:</span>
              <span className="productInfoValue">{movie?.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Limit:</span>
              <span className="productInfoValue">{movie?.limit}+</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input
              type="text"
              onChange={changeInputs}
              name="title"
              placeholder={movie?.title}
            />
            <label>Year</label>
            <input
              type="text"
              onChange={changeInputs}
              name="year"
              placeholder={movie?.year}
            />
            <label>Genre</label>
            <input
              type="text"
              onChange={changeInputs}
              name="genre"
              placeholder={movie?.genre}
            />
            <label>Limit</label>
            <input
              type="number"
              onChange={changeInputs}
              name="limit"
              placeholder={movie?.limit}
            />
            <label>Description</label>
            <input
              type="text"
              onChange={changeInputs}
              name="desc"
              placeholder={movie?.desc ? movie.desc : "description"}
            />
            <label>Trailor</label>
            <input
              type="file"
              onChange={(e) => setTrailor(e.target.files[0])}
              name="trailor"
              accept="video/*"
            />
            <label>Video</label>
            <input
              type="file"
              onChange={(e) => setVideo(e.target.files[0])}
              name="video"
              accept="video/*"
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={movie?.img}
                style={{
                  height: "170px",
                  width: "170px",
                }}
                alt=""
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                name="img"
                onChange={(e) => setImg(e.target.files[0])}
                type="file"
                id="file"

                style={{ display: "none" }}
              />
            </div>
            <button className="productButton" disabled={!isUploaded} onClick={updateHandler}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
