import { createContext, FC } from 'react'
import DataService from 'API/DataService'
import Spinner from 'components/Spinner/Spinner'
import { useFetching } from 'hooks/useFetching'
import { currencysType } from 'types/types'

type StoreType = {
  currencys: currencysType
  currencySymbols: Record<string, string>
}

export const StoreContext = createContext<StoreType>({} as StoreType)

const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  UAH: '₴',
}

type CurrencysProviderType = {
  children: React.ReactNode
}

const CurrencysProvider: FC<CurrencysProviderType> = ({ children }) => {
  const [currencys, isLoading] = useFetching(async () => {
    const currency = await DataService.getCurrency()
    return currency.data.filter((cur: { ccy: string }) => cur.ccy !== 'BTC')
  }) as [data: currencysType, isLoading: boolean]

  return (
    <StoreContext.Provider value={{ currencys, currencySymbols }}>
      {isLoading ? <Spinner /> : children}
    </StoreContext.Provider>
  )
}

export default CurrencysProvider
