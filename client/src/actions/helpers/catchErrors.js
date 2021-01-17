import { setAlert } from '../alert'

const catchErrors =  (err, dispatch) => {
   const errors = err.response.data.errors

   if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
   }
}
 export default catchErrors