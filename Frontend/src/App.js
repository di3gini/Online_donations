import './App.css'
import { persistor, store } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'
import Routes from './routes/Routes'
import 'antd/dist/antd.css'
import 'antd-button-color/dist/css/style.css'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
