import './Video.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation } from 'react-router-dom';

const Video = () => {
  const location = useLocation()
  const movie = location?.state

  return (
    <div className='video'>
    <Link to='/'>
    <div className="backIcon">
    <ArrowBackIcon className='back' />
     </div>
    </Link>
     <video
        className="videoFrame"
        autoPlay
        progress
        controls
        src={movie?.video}
        />
    </div>
  )
}

export default Video
