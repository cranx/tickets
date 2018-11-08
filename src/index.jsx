import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import 'normalize.css'
import App from './components/App'
import CurrencyStore from './store/CurrencyStore'
import TicketsStore from './store/TicketsStore'
import './style.pcss'

const currencyStore = new CurrencyStore()
const ticketsStore = new TicketsStore()

render(
  <Provider currencyStore={currencyStore} ticketsStore={ticketsStore}>
    <App />
  </Provider>,
  document.getElementById('root')
)
