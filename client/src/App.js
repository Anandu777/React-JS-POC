import React, { useEffect } from 'react'
import './App.css'
import {
   BrowserRouter as Router,
   Route,
   Switch,
   useHistory,
} from 'react-router-dom'

// Redux
import { Provider } from 'react-redux'
import store from './store'

// Components
import Navigation from './components/Navigation'
import Login from './components/Login'
import Register from './components/Register'
import Settings from './components/Settings'
import Alert from './components/Alert'
import Home from './components/Home'
import ChangePassword from './components/ChangePassword'
import NotFound from './components/NotFound'

import { getAuthenticatedUser } from './actions/auth'
import setHeaders from './utils/setHeaders'

setHeaders(localStorage.token)

const Routing = () => {
   const history = useHistory()
   useEffect(() => {
      store.dispatch(getAuthenticatedUser(history))
   }, [history])

   return (
      <Switch>
         <Route exact path='/' component={Login} />
         <Route path='/home' component={Home} />
         <Route path='/register' component={Register} />
         <Route path='/settings' component={Settings} />
         <Route path='/change-password' component={ChangePassword} />
         <Route component={NotFound} />
      </Switch>
   )
}

const App = () => {
   return (
      <Provider store={store}>
         <Router>
            <Navigation />
            <Alert />
            <Routing />
         </Router>
      </Provider>
   )
}

export default App
