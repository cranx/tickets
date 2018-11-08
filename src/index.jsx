import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import 'normalize.css'
import App from './components/App'
import Store from './store/Store'
import './style.pcss'

const store = new Store()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
