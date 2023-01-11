import "./listItems.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useState , useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
const ListItems = ({index , item}) => {

  const [movie , setMovie] = useState({})

  useEffect(() => {
    const getMovie= async () => {
      try {
        const res = await axios.get('movie/find/' + item, {
          headers: {
            token : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWFjMWU4YzkxODY0YTMyNTNkMTM5YiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MTExNDU5NX0.acRuoMxnXVYhB5CAjR4mDSoUv6mYGewS9j-BsMN18l8`,
          }
        });
        setMovie(res.data)
      } catch (err) {
        console.log(err)
      }
      };
      getMovie();
  }, [item])

  const [isHovered , setIsHovered] = useState(false)
  return (
   <Link className="link" to={'/watch'} state={movie}>
    <div className="listItems" onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
   style={{ 
    left : isHovered && index * 220 - 50 + index * 2.5
   }}

    >
<img
        src={movie?.imgSm}
        alt=""
      />
   {isHovered &&  <> 
      <video src={movie?.trailor} autoPlay loop muted />
      <div className="itemInfo">
      <div className="icons">
        <PlayArrowIcon className="icon" />
        <AddIcon className="icon" />
        <ThumbUpOffAltIcon className="icon" />
        <ThumbDownOffAltIcon className="icon" />
      </div>
      <div className="topInfo">
        <span>{movie?.title}</span>
        <span className="ageLimit">{movie?.limit}</span>
        <span>{movie?.year}</span>
      </div>
      <div className="desc">
      {movie?.desc}
      </div>
      <div className="genre">
   {movie?.genre}
      </div>
      </div>
     </> }
    </div>
   </Link>
  );
};

export default ListItems;
