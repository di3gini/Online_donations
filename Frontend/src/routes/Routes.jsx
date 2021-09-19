import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from '../pages/Auth/Login'
import Base from './Auth/Base'
import Register from '../pages/Auth/Register'

const Routes = () => {
  return (
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <
      <Route path='/' exact>
        <Base Component={Login} />
      </Route>
    </Switch>
  )
}
export default Routes
