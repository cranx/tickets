import queryString from 'query-string'

/**
 * Parses given url get-parameter e.x. "?stops=1-3"
 *
 * @param {string} query - location.search string
 * @returns {Array.<number>} - e.x. [1-3]
 */
export const parseUrl = query => {
  const parsed = queryString.parse(query)

  if (!parsed || !parsed.stops) {
    return []
  }

  // TODO: validate
  return parsed.stops.split('-').map(Number)
}

/**
 * Returns query string for given stops
 *
 * @param {Array.<number>} filters - enabled stops list
 * @returns {string} - e.x. "stops=1-3" or empty string if stops list is empty
 */
export const buildQuery = (filters = []) => {
  if (!filters.length) {
    return ''
  }
  return queryString.stringify({ stops: filters.join('-') })
}

/**
 * Returns list of unique 'stops' values
 *
 * @param {Array} tickets - tickets list
 * @returns {Array.<number>}
 */
export const getAvailableValues = tickets => {
  const values = tickets.map(ticket => ticket.stops)
  const uniqueValues = [...new Set(values)]

  return uniqueValues.sort()
}
