import { GET_EMPLOYEES, CLEAR_EMPLOYEES } from '../actions/types'

const initialState = {
   employees: [],
   totalCount: 0,
   pageCount: 0,
}

export default function (state = initialState, action) {
   const { type, payload } = action

   switch (type) {
      case GET_EMPLOYEES:
         return {
            ...state,
            employees: payload.employees,
            totalCount: payload.totalEmployeeCount,
            pageCount:
               payload.totalEmployeeCount % 5 === 0
                  ? payload.totalEmployeeCount / 5
                  : Math.floor(payload.totalEmployeeCount / 5) + 1,
         }
      case CLEAR_EMPLOYEES:
         return {
            ...state,
            employees: [],
            totalCount: 0,
         }
      default:
         return state
   }
}
