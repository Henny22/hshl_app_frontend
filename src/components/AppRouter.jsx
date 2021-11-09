import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import User from '../pages/User'
import UserDetails from '../pages/UserDetails'
import Campusplan from '../pages/Campusplan'
import CampusplanDetails from '../pages/CampusplanDetails'
import CampusplanErstellen from '../pages/CampusplanErstellen'
import Fahrpläne from '../pages/Fahrpläne'
import News from '../pages/News'
import NewsDetails from '../pages/NewsDetails'
import NewsErstellen from '../pages/NewsErstellen'
import Loginpage from '../pages/Loginpage'
import NotfoundPage from '../pages/NotfoundPage'
import Profilepage from '../pages/Profilepage'
import Registerpage from '../pages/Registerpage'
import ResetPasswordPage from '../pages/ResetPasswordPage'
import TestPage from '../pages/TestPage'

export default function AppRouter(props) {
  return (
    <>
      <Router>
        <Switch>
          <ProtectedRoute exact path='/' component={User} />
					<ProtectedRoute exact path='/campusplan' component={Campusplan} />
					<ProtectedRoute exact path='/fahrpläne' component={Fahrpläne} />
					<ProtectedRoute exact path='/news' component={News} />
          <ProtectedRoute exact path='/login' component={Loginpage} />
          <ProtectedRoute exact path='/register' component={Registerpage} />
          <ProtectedRoute exact path='/profile' component={Profilepage} />
          <ProtectedRoute exact path='/test' component={TestPage} />
					<ProtectedRoute exact path='/logout' component={Loginpage} />
					<ProtectedRoute exact path='/user_details/:id' component={UserDetails} />
					<ProtectedRoute exact path='/news_details/:id' component={NewsDetails} />
					<ProtectedRoute exact path='/news_erstellen' component={NewsErstellen} />
					<ProtectedRoute exact path='/campusplan_details/:id' component={CampusplanDetails} />
					<ProtectedRoute exact path='/campusplan_erstellen' component={CampusplanErstellen} />
          <ProtectedRoute
            exact
            path='/forgot-password'
            component={ForgotPasswordPage}
          />
          <ProtectedRoute
            exact
            path='/reset-password'
            component={ResetPasswordPage}
          />
          <Route exact path='*' component={NotfoundPage} />
        </Switch>
      </Router>
    </>
  )
}

function ProtectedRoute(props) {
  const { currentUser } = useAuth()
  const { path } = props
  console.log('path', path)
  const location = useLocation()
  console.log('location state', location.state)

  if (
    path === '/login' ||
    path === '/register' ||
    path === '/forgot-password' ||
    path === '/reset-password'
  ) {
    return currentUser ? (
      <Redirect to={location.state?.from ?? '/profile'} />
    ) : (
      <Route {...props} />
    )
  }
  return currentUser ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: path },
      }}
    />
  )
}
