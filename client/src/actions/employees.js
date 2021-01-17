import axios from 'axios'
import { GET_EMPLOYEES } from './types'
import catchErrors from './helpers/catchErrors'

// Get employees
export const getEmployees = (skipCount, filterValue, search) => async (
   dispatch
) => {
   try {
      const body = JSON.stringify({ skipCount, filterValue, search })
      const res = await axios.patch('/get-employees', body)
      dispatch({
         type: GET_EMPLOYEES,
         payload: res.data,
      })
   } catch (err) {
      catchErrors(err, dispatch)
   }
}
