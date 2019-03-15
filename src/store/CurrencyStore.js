import { configure, observable, action, runInAction } from 'mobx'

configure({ enforceActions: 'observed' }) // don't allow state modifications outside actions

export default class CurrencyStore {
  @observable.struct
  currencyRates = {
    RUB: 1,
  }

  @observable
  isReady = false

  @observable
  currentCurrency = window.sessionStorage.getItem('currency') || 'RUB'

  @observable
  error = ''

  constructor() {
    this.fetchCurrencyRates()
  }

  @action.bound
  setCurrentCurrency(currency) {
    window.sessionStorage.setItem('currency', currency)
    this.currentCurrency = currency
  }

  @action
  async fetchCurrencyRates() {
    let data
    try {
      const response = await fetch(
        'https://free.currencyconverterapi.com/api/v6/convert?q=RUB_USD,RUB_EUR&apiKey=deea7dce505c567ae1bc'
      )
      data = await response.json()
    } catch (error) {
      runInAction(() => {
        this.error = "Couldn't fetch currency rates"
      })
      console.error(error) // eslint-disable-line

      return
    }

    runInAction(() => {
      this.isReady = true

      this.currencyRates = {
        ...this.currencyRates,
        USD: data.results.RUB_USD.val,
        EUR: data.results.RUB_EUR.val,
      }
    })
  }
}
