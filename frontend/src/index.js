// * Importing Libraries
import React from 'react'
import ReactDOM from 'react-dom'
// * Importing provider to pass store & store.js file to get store in the app
import { Provider } from 'react-redux'
import store from './store'
// * bootstrap file
import './bootstrap.min.css'
// * Importing Css files
import './index.css'
// * Importing components files
import App from './App'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
