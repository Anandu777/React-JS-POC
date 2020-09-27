import axios from 'axios'

import { GET_USER, CLEAR_USER, CLEAR_EMPLOYEES } from './types'

import { setAlert } from './alert'

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

      const config = {
         headers: {
            'x-auth-token': token,
         },
      }

      const res = await axios.get('/getuser', config)

      dispatch({
         type: GET_USER,
         payload: res.data,
      })
   } catch (err) {
      const errors = err.response.data.errors

      if (errors) {
         errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
      }

      localStorage.removeItem('token')
      history.push('/')
   }
}

// Register User
export const register = ({ email, password }, history) => async (dispatch) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      }

      const body = JSON.stringify({ email, password })

      const res = await axios.post('/register', body, config)

      localStorage.setItem('token', res.data.token)

      dispatch({
         type: GET_USER,
         payload: res.data.user,
      })

      history.push('/home')
   } catch (err) {
      const errors = err.response.data.errors

      if (errors) {
         errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
      }
   }
}

// Login user
export const login = ({ email, password }, history) => async (dispatch) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      }

      const body = JSON.stringify({ email, password })

      const res = await axios.post('/login', body, config)

      localStorage.setItem('token', res.data.token)

      dispatch({
         type: GET_USER,
         payload: res.data.user,
      })

      history.push('/home')
   } catch (err) {
      const errors = err.response.data.errors

      if (errors) {
         errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
      }
   }
}

// Change password
export const changePassword = ({ oldPassword, password }, history) => async (
   dispatch
) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token'),
         },
      }

      const body = JSON.stringify({ oldPassword, password })

      const res = await axios.patch('/changepassword', body, config)

      dispatch(setAlert(res.data.msg, 'success'))
      history.push('/settings')
   } catch (err) {
      const errors = err.response.data.errors

      if (errors) {
         errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
      }
   }
}

// Logout
export const logout = (history) => (dispatch) => {
   dispatch({
      type: CLEAR_USER,
   })

   dispatch({
      type: CLEAR_EMPLOYEES,
   })

   history.push('/')
}
