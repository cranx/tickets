export const currencySybmols = {
  RUB: {
    symbol: '₽',
    postfix: true,
  },
  USD: { symbol: '$' },
  EUR: { symbol: '€' },
}

export const formatPrice = (amount, currency, currencyRate) => {
  const formattedPrice = Math.ceil(amount * currencyRate)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  const config = currencySybmols[currency]

  return config.postfix ? `${formattedPrice}${config.symbol}` : `${config.symbol}${formattedPrice}`
}
