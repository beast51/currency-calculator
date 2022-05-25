import { FC } from 'react'
import { currencysType, HeaderPropsType } from '../../types/types'
import { format } from '../../utils/common'
import s from './Header.module.scss'

export const Header: FC<HeaderPropsType> = ({ currencys, currencySymbols }) => {
  return (
    <header className={s.header}>
      <div className="wrapper">
        <a
          className={s.logo}
          rel="noopener noreferrer"
          href="http://beast51.github.io/currency-calculator"
          target=""
        >
          <span></span>
        </a>
        <div className={s.container}>
          {currencys.map((cur: currencysType) => (
            <div key={cur.ccy}>{`${currencySymbols[`${cur.ccy}`]} ${format(
              parseFloat(cur.buy)
            )} / ${format(parseFloat(cur.sale))}`}</div>
          ))}
        </div>
      </div>
    </header>
  )
}
