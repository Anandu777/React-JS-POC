import axios from 'axios'

const setAuthToken = (token) => {   
   if (token) {
      axios.defaults.headers.common['x-auth-token'] = token
   }
    else {
      delete axios.defaults.headers.common['x-auth-token']
   }
   axios.defaults.headers.post['Content-Type'] = 'application/json'
   axios.defaults.headers.patch['Content-Type'] = 'application/json'
}

export default setAuthToken
