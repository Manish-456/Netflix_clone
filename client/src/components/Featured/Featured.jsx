import "./featured.scss";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect, useState } from "react";
import axios from "axios";
const Featured = ({type, setGenre}) => {
  const [content , setContent] = useState({})
  useEffect(() => {
    const getRandomContent = async() => {
      try {
        const res = await axios.get(`movie/random?type=${type}`,{
        headers: {
          token : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWFjMWU4YzkxODY0YTMyNTNkMTM5YiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MTExNDU5NX0.acRuoMxnXVYhB5CAjR4mDSoUv6mYGewS9j-BsMN18l8`,
        }})
        setContent(res.data[0])

      } catch (err) {
        console.log(err)
      }
    }
getRandomContent()
  }, [type])


  return (
    <div className="featured"> 
       {type && <div className="category">
        <span>{type === "movies" ? "Movies" : "TvSeries"}</span>
          <select name="genre" id="genre" onChange={e => setGenre(e.target.value)}>
           <option>Genre</option>
           <option value="comedy">Comedy</option>
           <option value="adventure">Adventure</option>
           <option value="crime">Crime</option>
           <option value="fantasy">Fantasy</option>
           <option value="documentary">Documentary</option>
           <option value="historical">Historical</option>
           <option value="horror">Horror</option>
           <option value="romance">Romance</option>
           <option value="sci-fi">Sci-Fi</option>
           <option value="thriller">Thriller</option>
           <option value="western">Western</option>
           <option value="animation">Animation</option>
           <option value="drama">Drama</option>
          </select>
        
        
        
        
         </div>}
      <img
      className="mainImg"
        src={content?.img}
        alt="profile"
      />
      <div className="info">
      <img
      style={{
        width : "200px"
      }}
          src={content?.imgTitle}
          alt=""
        />
        <span className="desc">
          {content?.desc}
        </span>
        <div className="buttons">
         <button className="play" >
         <PlayCircleFilledWhiteIcon />
         <span>Play</span>
         </button>
         <button className="more">
          <InfoOutlinedIcon />
         <span>Info</span>
         </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
