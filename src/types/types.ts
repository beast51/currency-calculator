export type currencysType = {
  base_ccy: string
  buy: string
  ccy: string
  sale: string
}

export type InputPropsType = {
  className?: string
  maxLength: number
  type: 'number'
  autoComplete: 'off'
  placeholder: string
  name: string
  value: number | ''
  onChange: (e: React.SyntheticEvent) => void
}

export type HeaderPropsType = {
  currencys: [currencysType] | []
  currencySymbols: { [key: string]: string }
}

export type ConverterPropsType = {
  currencys: [currencysType] | []
  currencySymbols: { [key: string]: string }
}

export type SpinnerPropsType = {
  className?: string
}