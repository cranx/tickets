import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import App from './components/App'

const store = {}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
