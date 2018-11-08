import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Header from './header/Header'
import Loading from './loading/Loading'
import TicketsPage from './ticketsPage/TicketsPage'

@hot(module)
@inject(({ currencyStore, ticketsStore }) => ({
  error: currencyStore.error || ticketsStore.error,
  isReady: currencyStore.isReady && ticketsStore.isReady,
}))
export default class App extends React.Component {
  static propTypes = {
    error: PropTypes.string.isRequired,
    isReady: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <div className="app">
        <div className="app__content">
          <Header />
          {this.props.error && <div className="app__error">{this.props.error}</div>}
          {!this.props.isReady && <Loading />}
          {this.props.isReady && (
            <Router>
              <Route path="/" component={TicketsPage} />
            </Router>
          )}
        </div>
      </div>
    )
  }
}
