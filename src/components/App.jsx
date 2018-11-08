import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { inject } from 'mobx-react'
import PropTypes from 'prop-types'
import TicketsPage from './ticketsPage/TicketsPage'

@hot(module)
@inject(({ store }) => ({
  error: store.error,
}))
export default class App extends React.Component {
  static propTypes = {
    error: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className="app">
        <div className="app__content">
          {this.props.error && <div className="app__error">{this.props.error}</div>}
          <Router>
            <Route path="/" component={TicketsPage} />
          </Router>
        </div>
      </div>
    )
  }
}
