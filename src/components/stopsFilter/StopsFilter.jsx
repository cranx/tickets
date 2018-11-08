import React from 'react'
import PropTypes from 'prop-types'
import pluralize from 'pluralize-ru'
import StopsFilterItem from '../stopsFilterItem/StopsFilterItem'

export default class StopsFilter extends React.Component {
  static propTypes = {
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
    enabledValues: PropTypes.arrayOf(PropTypes.number),
    applyFilter: PropTypes.func.isRequired,
  }

  static defaultProps = {
    enabledValues: [],
  }

  isFilterEnabled = filter =>
    !this.props.enabledValues.length || this.props.enabledValues.includes(filter)

  isAllFiltersEnabled = (filters = this.props.enabledValues) =>
    !filters.length || this.props.values.every(value => filters.includes(value))

  handleFilterChange = (filter, isChecked) => {
    let nextFilters
    const { values: allValues, enabledValues } = this.props

    // don't let user disable last filter
    if (!isChecked && enabledValues.length === 1 && enabledValues[0] === filter) {
      return
    }

    nextFilters = allValues.filter(value => {
      if (value === filter) return isChecked
      return !enabledValues.length || enabledValues.includes(value)
    })

    if (this.isAllFiltersEnabled(nextFilters)) {
      nextFilters = []
    }

    this.applyFilter(nextFilters)
  }

  handleAllFilterChange = () => {
    if (this.isAllFilterEnabled) return
    this.applyFilter()
  }

  handleFilterOnly = filter => {
    this.applyFilter([filter])
  }

  applyFilter(stops) {
    this.props.applyFilter(stops)
  }

  render() {
    const { values } = this.props
    return (
      <div className="stops-filter">
        <h3>Количество пересадок</h3>
        <ul>
          <li>
            <StopsFilterItem
              isChecked={this.isAllFiltersEnabled()}
              onChange={this.handleAllFilterChange}
            >
              Все
            </StopsFilterItem>
          </li>
          {values.map(value => (
            <li key={value}>
              <StopsFilterItem
                isChecked={this.isFilterEnabled(value)}
                onChange={checked => this.handleFilterChange(value, checked)}
                onFilterOnly={() => this.handleFilterOnly(value)}
              >
                {pluralize(value, 'Без пересадок', '%d пересадка', '%d пересадки', '%d пересадок')}
              </StopsFilterItem>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
