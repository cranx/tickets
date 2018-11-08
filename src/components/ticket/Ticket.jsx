import React from 'react'
import PropTypes from 'prop-types'

export default class Ticket extends React.PureComponent {
  static propTypes = {
    ticket: PropTypes.shape({
      origin: PropTypes.string,
      origin_name: PropTypes.string,
      destination: PropTypes.string,
      destination_name: PropTypes.string,
      departure_date: PropTypes.string,
      departure_time: PropTypes.string,
      arrival_date: PropTypes.string,
      arrival_time: PropTypes.string,
      carrier: PropTypes.string,
      stops: PropTypes.number,
      price: PropTypes.number,
    }).isRequired,
  }

  render() {
    const { ticket } = this.props
    return (
      <div className="ticket">
        <pre>{JSON.stringify(ticket, null, 2)}</pre>
      </div>
    )
  }
}
