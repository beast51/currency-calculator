import { FC, useEffect, useState } from 'react'
import './App.scss'
import { Converter } from './components/Converter/Converter'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import DataService from './API/DataService'
import { useFetching } from './hooks/useFetching'
import { currencysType } from './types/types'
import Spinner from './components/Spinner/Spinner'

const currencySymbols: { [key: string]: string } = {
  USD: '$',
  EUR: '€',
  UAH: '₴',
}

const App: FC = () => {
  const [currencys, setCurrencys] = useState<[currencysType] | []>([])

  const [fetchingData, isLoading] = useFetching(async () => {
    const currency = await DataService.getCurrency()
    setCurrencys(
      currency.data.filter((cur: { ccy: string }) => cur.ccy !== 'BTC')
    )
  }) as any

  useEffect(() => {
    fetchingData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Header currencys={currencys} currencySymbols={currencySymbols} />
          <div className="container">
            <main>
              <Converter
                currencys={currencys}
                currencySymbols={currencySymbols}
              />
            </main>
          </div>
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
