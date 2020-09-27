import {
   GET_USER,
   CLEAR_USER,
} from '../actions/types'

const initialState = {
   isAuthenticated: false,
   user: null,
}

export default function (state = initialState, action) {
   const { type, payload } = action

   switch (type) {
      case GET_USER:
         return {
            ...state,
            isAuthenticated: true,
            user: payload,
         }
      case CLEAR_USER:
         localStorage.removeItem('token')
         return {
            ...state,
            isAuthenticated: false,
            user: null,
         }
      default:
         return state
   }
}
