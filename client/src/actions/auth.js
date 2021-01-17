import axios from 'axios'
import { GET_USER, CLEAR_USER, CLEAR_EMPLOYEES } from './types'
import { setAlert } from './alert'
import catchErrors from './helpers/catchErrors'
import setHeaders from '../utils/setHeaders'

// Get authenticated user
export const getAuthenticatedUser = (history) => async (dispatch) => {
   try {
      const token = localStorage.getItem('token')
      if (!token) {
         if (history.location.pathname === '/register') {
            return
         }
         history.push('/')
         return
      }
      setHeaders(token)
      const res = await axios.get('/get-user')
      dispatch(getUser(res.data))
   } catch (err) {
      catchErrors(err, dispatch)
      localStorage.removeItem('token')
      history.push('/')
   }
}

// Register User
export const register = ({ email, password }, history) => async (dispatch) => {
   try {
      const body = JSON.stringify({ email, password })
      const res = await axios.post('/register', body)
      localStorage.setItem('token', res.data.token)
      setHeaders(res.data.token)
      dispatch(getUser(res.data.user))
      history.push('/home')
   } catch (err) {
      catchErrors(err, dispatch)
   }
}

// Login user
export const login = ({ email, password }, history) => async (dispatch) => {
   try {
      const body = JSON.stringify({ email, password })
      const res = await axios.post('/login', body)
      localStorage.setItem('token', res.data.token)
      setHeaders(res.data.token)
      dispatch(getUser(res.data.user))
      history.push('/home')
   } catch (err) {
      catchErrors(err, dispatch)
   }
}

// Change password
export const changePassword = ({ oldPassword, password }, history) => async (
   dispatch
) => {
   try {
      const body = JSON.stringify({ oldPassword, password })
      const res = await axios.patch('/change-password', body)
      dispatch(setAlert(res.data.msg, 'success'))
      history.push('/settings')
   } catch (err) {
      catchErrors(err, dispatch)
   }
}

// Logout
export const logout = (history) => (dispatch) => {
   dispatch({ type: CLEAR_USER })
   dispatch({ type: CLEAR_EMPLOYEES })
   history.push('/')
}

export function getUser(user) {
   return {
      type: GET_USER,
      payload: user,
   }
}
