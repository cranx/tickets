import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import pluralize from 'pluralize-ru'
import { parse as parseDate, format as formatDate } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'
import { formatPrice } from '../../utils/price'
import carrierLogo from './turkish.png'
import Plane from './plane.svg'
import './ticket.pcss'

@inject(({ currencyStore: store }) => ({
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
      stops: PropTypes.number,
      price: PropTypes.number,
    }).isRequired,
    currency: PropTypes.string.isRequired,
    currencyRate: PropTypes.number.isRequired,
  }

  render() {
    const { ticket, currency, currencyRate: rate } = this.props

    // TODO: move to utils
    const departDate = parseDate(
      `${ticket.departure_date} ${ticket.departure_time}`,
      'dd.MM.yy H:mm',
      new Date()
    )
    const arriveDate = parseDate(
      `${ticket.arrival_date} ${ticket.arrival_time}`,
      'dd.MM.yy H:mm',
      new Date()
    )

    return (
      <div className="ticket">
        <div className="ticket__purchase">
          <img
            className="ticket__carrier-logo"
            src={carrierLogo}
            alt="Turkish Airlines"
            width="120"
            height="35"
          />
          {/* TODO: extract button component */}
          <button className="ticket__purchase-button" type="button">
            {`Купить `}
            <span className="ticket__purchase-price">
              {`за ${formatPrice(ticket.price, currency, rate)}`}
            </span>
          </button>
        </div>
        <div className="ticket__info">
          <div className="ticket__point">
            <div className="ticket__time">{formatDate(departDate, 'HH:mm')}</div>
            <div className="ticket__city">{`${ticket.origin}, ${ticket.origin_name}`}</div>
            <div className="ticket__date">
              {formatDate(departDate, 'd LLL yyyy, ', { locale: ruLocale })}
              <span className="ticket__date-week-day">
                {formatDate(departDate, 'EEEEEE', { locale: ruLocale })}
              </span>
            </div>
          </div>
          <div className="ticket__stops">
            <div className="ticket__stops-text">
              {!!ticket.stops &&
                pluralize(ticket.stops, '', '%d пересадка', '%d пересадки', '%d пересадок')}
            </div>
            <div className="ticket__stops-line">
              <Plane className="ticket__stops-plane" />
            </div>
          </div>
          <div className="ticket__point">
            <div className="ticket__time">{formatDate(arriveDate, 'HH:mm')}</div>
            <div className="ticket__city">
              {`${ticket.destination_name}, ${ticket.destination}`}
            </div>
            <div className="ticket__date">
              {formatDate(arriveDate, 'd LLL yyyy, ', { locale: ruLocale })}
              <span className="ticket__date-week-day">
                {formatDate(arriveDate, 'EEEEEE', { locale: ruLocale })}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
