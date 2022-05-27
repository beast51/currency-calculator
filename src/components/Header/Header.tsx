import { FC, useContext } from 'react'
import { StoreContext } from '../../providers/CurrencysProvider'
import { ContextType } from '../../types/types'
import { format } from '../../utils/common'
import style from './Header.module.scss'

export const Header: FC = () => {
  const { currencys, currencySymbols } = useContext<ContextType>(StoreContext)
  console.log(currencys)
  return (
    <header className={style.header}>
      <div className="wrapper">
        <a
          className={style.logo}
          rel="noopener noreferrer"
          href="http://beast51.github.io/currency-calculator"
          target=""
        >
          <span></span>
          Privat bank
        </a>
        <div className={style.container}>
          {currencys.map((currency) => (
            <div key={currency.ccy}>
              {`${currencySymbols[`${currency.ccy}`]} ${format(
                parseFloat(currency.buy)
              )} / ${format(parseFloat(currency.sale))}`}
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
