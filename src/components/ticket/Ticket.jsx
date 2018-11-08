import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { formatPrice } from '../../utils/price'

@inject(({ store }) => ({
  currency: store.currentCurrency,
  currencyRate: store.currencyRates[store.currentCurrency],
}))
@observer
export default class Ticket extends React.Component {
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
    currency: PropTypes.string.isRequired,
    currencyRate: PropTypes.number.isRequired,
  }

  render() {
    const { ticket, currency, currencyRate: rate } = this.props
    return (
      <div className="ticket">
        <pre>{JSON.stringify(ticket, null, 2)}</pre>
        <div>{`за ${formatPrice(ticket.price, currency, rate)}`}</div>
      </div>
    )
  }
}
