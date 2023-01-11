import axios from 'axios'
import { loginFailure, loginStart, loginSuccess } from './redux/authContext/AuthAction'

export const loginUser = async(user , dispatch) => {
dispatch(loginStart())
 try {
 const res  = await axios.post('auth/login', user)
 dispatch(loginSuccess(res.data))
} catch (err) {
 dispatch(loginFailure())
}
}