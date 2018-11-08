import React from 'react'
import PropTypes from 'prop-types'

export default class StopsFilter extends React.PureComponent {
  static propTypes = {
    children: PropTypes.string.isRequired, // filter name
    isChecked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onFilterOnly: PropTypes.func,
  }

  static defaultProps = {
    onFilterOnly: null
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
        <label>
          <input type="checkbox" checked={this.props.isChecked} onChange={this.handleChange} />
          {this.props.children}
        </label>
        {this.props.onFilterOnly && (
          <button type="button" onClick={this.handleOnlyClick}>
            Только
          </button>
        )}
      </div>
    )
  }
}
