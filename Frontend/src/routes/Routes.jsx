import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from '../pages/Auth/Login'
import Base from './Auth/Base'
import Register from '../pages/Auth/Register'
import Donation from '../pages/Donations/Donation'

const Routes = () => {
  return (
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/donation' component={Donation} />
      <Route path='/' exact>
        <Base Component={Donation} />
      </Route>
    </Switch>
  )
}
export default Routes
