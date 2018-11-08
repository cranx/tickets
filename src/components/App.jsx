import React from 'react'
import { hot } from 'react-hot-loader'
import { Route } from 'react-router-dom'
import TicketsPage from './ticketsPage/TicketsPage'

@hot(module)
export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Route component={TicketsPage} />
      </div>
    )
  }
}
