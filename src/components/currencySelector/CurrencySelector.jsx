import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'

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
        <ul>
          {this.values.map(currency => (
            <li key={currency}>
              <label>
                <input
                  type="radio"
                  name="currency"
                  value={currency}
                  checked={currency === this.props.store.currentCurrency}
                  onChange={this.handleChange}
                />
                {currency}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
