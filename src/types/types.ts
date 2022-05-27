export type currencysType = [{
  base_ccy: string
  buy: string
  ccy: string
  sale: string
}] | []

export type ContextType = {
  currencys: currencysType
  currencySymbols: { [key: string]: string }
}


