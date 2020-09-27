import axios from 'axios'

import { GET_EMPLOYEES } from './types'

import { setAlert } from './alert'

// Get employees
export const getEmployees = (skipCount, filterValue, search) => async (
   dispatch
) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token'),
         },
      }

      const body = JSON.stringify({ skipCount, filterValue, search })

      const res = await axios.patch('/getemployees', body, config)

      dispatch({
         type: GET_EMPLOYEES,
         payload: res.data,
      })
   } catch (err) {
      const errors = err.response.data.errors

      if (errors) {
         errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
      }
   }
}
