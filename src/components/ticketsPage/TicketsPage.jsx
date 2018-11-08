import React from 'react'
import { withRouter } from 'react-router-dom'
import { locationShape, historyShape } from 'react-router-props'
import { inject } from 'mobx-react'
import PropTypes from 'prop-types'
import {
  parseUrl as parseFiltersFromUrl,
  getAvailableValues,
  buildQuery,
} from '../../utils/stopsFilter'
import CurrencySelector from '../currencySelector/CurrencySelector'
import StopsFilter from '../stopsFilter/StopsFilter'
import TicketsList from '../ticketsList/TicketsList'
import './ticketsPage.pcss'

@withRouter
@inject(({ ticketsStore: store }) => ({
  tickets: store.tickets,
}))
export default class TicketsPage extends React.Component {
  static propTypes = {
    location: locationShape.isRequired,
    history: historyShape.isRequired,
    tickets: PropTypes.arrayOf(PropTypes.shape).isRequired,
  }

  applyFilter = stops => {
    this.props.history.push({ search: buildQuery(stops) })
  }

  render() {
    const stopsFilter = parseFiltersFromUrl(this.props.location.search)
    const { tickets } = this.props
    let ticketsToRender = tickets

    if (stopsFilter.length) {
      ticketsToRender = tickets.filter(ticket => stopsFilter.includes(ticket.stops))
    }

    return (
      <div className="tickets-page">
        <div className="tickets-page__filters">
          <CurrencySelector />
          <StopsFilter
            values={getAvailableValues(tickets)}
            enabledValues={stopsFilter}
            applyFilter={this.applyFilter}
          />
        </div>
        <div className="tickets-page__list">
          <TicketsList tickets={ticketsToRender} />
        </div>
      </div>
    )
  }
}
