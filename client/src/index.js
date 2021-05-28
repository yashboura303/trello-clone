import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/configureStore'
import AppRouter from './routers/AppRouter'
import './index.css'

ReactDOM.render(
  <React.StrictMode><Provider store={store}>
  <AppRouter />
</Provider></React.StrictMode>,
  document.getElementById('root'),
)
