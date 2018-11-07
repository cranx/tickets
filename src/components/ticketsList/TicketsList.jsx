import React from 'react'
import PropTypes from 'prop-types'
import Ticket from '../ticket/Ticket'

export default class TicketsList extends React.Component {
  static propTypes = {
    tickets: PropTypes.arrayOf(
      PropTypes.shape({
        price: PropTypes.number,
      })
    ),
  }

  static defaultProps = {
    tickets: null,
  }

  render() {
    const { tickets } = this.props
    return (
      <div className="tickets-list">
        {tickets && tickets.map(ticket => <Ticket key={ticket.price} ticket={ticket} />)}
      </div>
    )
  }
}
