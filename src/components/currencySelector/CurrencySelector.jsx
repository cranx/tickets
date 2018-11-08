import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'
import './currencySelector.pcss'

@inject(({ currencyStore: store }) => ({
  currentCurrency: store.currentCurrency,
  setCurrentCurrency: store.setCurrentCurrency,
}))
@observer
export default class CurrencySelector extends React.Component {
  static propTypes = {
    currentCurrency: PropTypes.string.isRequired,
    setCurrentCurrency: PropTypes.func.isRequired,
  }

  values = ['RUB', 'USD', 'EUR']

  handleChange = ({ target }) => {
    this.props.setCurrentCurrency(target.value)
  }

  render() {
    return (
      <div className="currency-selector">
        <h3>Валюта</h3>
        <ul className="currency-selector__list">
          {this.values.map(currency => {
            const isCurrent = currency === this.props.currentCurrency

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
