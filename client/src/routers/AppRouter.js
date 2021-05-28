import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from '../App'

import Board from '../components/Board'
import Login from '../components/Login'

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/board" component={App} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default AppRouter
