import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'
import './currencySelector.pcss'

@inject('store')
@observer
export default class CurrencySelector extends React.Component {
  static propTypes = {
    store: PropTypes.shape({
      currentCurrency: PropTypes.string,
      setCurrentCurrency: PropTypes.func,
    }).isRequired,
  }

  values = ['RUB', 'USD', 'EUR']

  handleChange = ({ target }) => {
    this.props.store.setCurrentCurrency(target.value)
  }

  render() {
    return (
      <div className="currency-selector">
        <h3>Валюта</h3>
        <ul className="currency-selector__list">
          {this.values.map(currency => {
            const isCurrent = currency === this.props.store.currentCurrency

            return (
              <li
                key={currency}
                className={classNames('currency-selector__item', { 'is-current': isCurrent })}
              >
                <label className="currency-selector__label">
                  <input
                    className="currency-selector__input"
                    type="radio"
                    name="currency"
                    value={currency}
                    checked={isCurrent}
                    onChange={this.handleChange}
                  />
                  {currency}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
