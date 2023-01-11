import { useContext, useState } from "react";
import "./newMovie.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../Firebase";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { publishMovies } from "../../context/movieContext/MoviesApiCalls";
import { useHistory } from "react-router-dom"
export default function NewMovie() {
  const history = useHistory()
  const { dispatch } = useContext(MovieContext);
  const [movie, setMovie] = useState({});
  const [img, setImg] = useState(null);
  const [trailor, setTrailor] = useState(null);
  const [video, setVideo] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const handleChange = (e) => {
    setMovie((prev) => {
      return { ...prev,[e.target.name]: e.target.value };
    });
  };


  const uploadFile = (items) => {
    items.forEach((item) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + item.file?.name;
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, item.file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: downloadURL };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    uploadFile([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailor, label: "trailor" },
      { file: video, label: "video" },
    ]);
  };

  const handlePublish = (e) => {
    e.preventDefault();
    publishMovies(movie, dispatch);
    history.push('/movies')
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Thumbnail</label>
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>

        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="John Wick"
            id="title"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="Movie Description..."
            id="desc"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Action, Romance, Comedy"
            id="genre"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            id="duration"
            name="duration"
            placeholder="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Age Limit</label>
          <input
            type="number"
            id="limit"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            id="year"
            name="year"
            placeholder="published year (1976)"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Trailor</label>
          <input
            type="file"
            accept="video/*"
            name="trailor"
            id="trailor"
            onChange={(e) => setTrailor(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Full Movie</label>
          <input
            type="file"
            id="video"
            name="video"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label> Is Series ? </label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option defaultValue >Yes</option>
          <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        {uploaded === 5 ? (
          <button className="addProductButton" onClick={handlePublish}>
            Publish
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
