import { configure, observable, action, runInAction } from 'mobx'

configure({ enforceActions: 'observed' }) // don't allow state modifications outside actions

export default class TicketsStore {
  @observable.ref
  tickets = []

  @observable
  isReady = false

  @observable
  error = ''

  constructor() {
    this.fetchTickets()
  }

  @action
  async fetchTickets() {
    let data
    try {
      const response = await fetch('/tickets.json')
      data = await response.json()
    } catch (error) {
      runInAction(() => {
        this.error = "Couldn't fetch tickets"
      })
      console.error(error) // eslint-disable-line

      return
    }

    runInAction(() => {
      this.isReady = true

      const byPrice = (a, b) => a.price - b.price
      this.tickets = data.tickets.sort(byPrice)
    })
  }
}
