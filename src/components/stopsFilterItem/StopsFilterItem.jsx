import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Tick from './tick.svg'
import './stopsFilterItem.pcss'

export default class StopsFilter extends React.PureComponent {
  static propTypes = {
    children: PropTypes.string.isRequired, // filter name
    isChecked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onFilterOnly: PropTypes.func,
  }

  static defaultProps = {
    onFilterOnly: null,
  }

  handleChange = ({ target }) => {
    this.props.onChange(target.checked)
  }

  handleOnlyClick = () => {
    this.props.onFilterOnly()
  }

  render() {
    return (
      <div className="stops-filter-item">
        <label className="stops-filter-item__label">
          <div className={classNames('stops-filter-item__checkbox', { 'is-checked': this.props.isChecked })}>
            <Tick className="stops-filter-item__tick" />
          </div>
          <input
            className="stops-filter-item__input"
            type="checkbox"
            checked={this.props.isChecked}
            onChange={this.handleChange}
          />
          {this.props.children}
        </label>
        {this.props.onFilterOnly && (
          <button className="stops-filter-item__only" type="button" onClick={this.handleOnlyClick}>
            Только
          </button>
        )}
      </div>
    )
  }
}
