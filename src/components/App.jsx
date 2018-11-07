import React from 'react'
import { hot } from 'react-hot-loader'
import ticketsMock from '../static/tickets.json'
import TicketsList from './ticketsList/TicketsList'

const byPrice = (a, b) => a.price - b.price
const sortedTickets = ticketsMock.tickets.sort(byPrice)

const App = () => (
  <div className="app">
    <TicketsList tickets={sortedTickets} />
  </div>
)

export default hot(module)(App)
