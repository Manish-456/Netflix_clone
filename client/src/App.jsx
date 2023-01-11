import {BrowserRouter as Router , Routes , Route, Navigate} from 'react-router-dom'
import './App.scss'
import Home from './Page/Home/Home'
import Video from './Page/WatchVideo/Video'
import Register from './Page/Register/Register'
import Login from './Page/Login/Login'
import { useContext } from 'react'
import { AuthContext } from './redux/authContext/AuthContext'


const App = () => {
const {user} = useContext(AuthContext)
  return  (
    <Router>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to='/register' />} />
        <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
   { user && <>   <Route path='/movies' element={<Home  type="movie"/>} />
        <Route path='/series' element={<Home  type="series"/>} />
        <Route path='/watch' element={<Video/>} /></>  }
      </Routes>
    </Router>
  )
}

export default App

