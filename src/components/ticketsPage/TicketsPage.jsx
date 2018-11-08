import React from 'react'
import { locationShape, historyShape } from 'react-router-props'
import ticketsMock from '../../static/tickets.json'
import {
  parseUrl as parseFiltersFromUrl,
  getAvailableValues,
  buildQuery,
} from '../../utils/stopsFilter'
import StopsFilter from '../stopsFilter/StopsFilter'
import TicketsList from '../ticketsList/TicketsList'
import './ticketsPage.pcss'

const byPrice = (a, b) => a.price - b.price
const sortedTickets = ticketsMock.tickets.sort(byPrice)

export default class TicketsPage extends React.Component {
  static propTypes = {
    location: locationShape.isRequired,
    history: historyShape.isRequired,
  }

  applyFilter = stops => {
    this.props.history.push({ search: buildQuery(stops) })
  }

  render() {
    const stopsFilter = parseFiltersFromUrl(this.props.location.search)
    let ticketsToRender = sortedTickets

    if (stopsFilter.length) {
      ticketsToRender = sortedTickets.filter(ticket => stopsFilter.includes(ticket.stops))
    }

    return (
      <div className="tickets-page">
        <StopsFilter
          values={getAvailableValues(sortedTickets)}
          enabledValues={stopsFilter}
          applyFilter={this.applyFilter}
        />
        <TicketsList tickets={ticketsToRender} />
      </div>
    )
  }
}
