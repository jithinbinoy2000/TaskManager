import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import { Provider } from 'react-redux'
import taskStore from './Redux/taskStore.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store={taskStore}> <App /></Provider>
  </React.StrictMode>,
)
