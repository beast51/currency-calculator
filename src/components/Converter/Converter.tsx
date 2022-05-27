import { FC, useContext, useEffect, useMemo, useState } from 'react'
import { StoreContext } from '../../providers/CurrencysProvider'
import { ContextType } from '../../types/types'
import { format } from '../../utils/common'
import { Button } from '../Button/Button'
import Input from '../Input/Input'
import style from './Converter.module.scss'

const enum CurrencyList {
  UAH = 'UAH',
  USD = 'USD',
  EUR = 'EUR',
}

const currencyList = [CurrencyList.UAH, CurrencyList.USD, CurrencyList.EUR]

export const Converter: FC = () => {
  const { currencys, currencySymbols } = useContext<ContextType>(StoreContext)
  const [currencyA, setCurrencyA] = useState(CurrencyList.USD)
  const [currencyB, setCurrencyB] = useState(CurrencyList.UAH)
  const [amountA, setAmountA] = useState<number | string>('')
  const [amountB, setAmountB] = useState<number | string>('')

  const [isBuy, setIsBuy] = useState(true)
  const [isChange, setIsChange] = useState(false)

  const getRates = (isBuy: boolean) => {
    const rates: Record<string, string> = { UAH: '1' }
    currencys.forEach((item) => {
      isBuy ? (rates[item.ccy] = item.buy) : (rates[item.ccy] = item.sale)
    })
    return rates
  }

  const [rates, setRates] = useState(getRates(isBuy))

  const swapLogic = () => {
    if (isChange && amountA && amountB) {
      setCurrencyA(currencyB)
      setCurrencyB(currencyA)
      if (currencyA !== CurrencyList.UAH && currencyB !== CurrencyList.UAH) {
        setAmountB(format((+amountA * +rates[currencyB]) / +rates[currencyA]))
      } else if (!isBuy) {
        setAmountA(format(+amountA * +rates[currencyA]))
        setAmountB(amountA)
      } else {
        setAmountA(amountB)
        setAmountB(format(+amountB * +rates[currencyB]))
      }
      setIsChange(!isChange)
    }
  }

  useEffect(() => {
    setRates(getRates(isBuy))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBuy])

  useEffect(() => {
    swapLogic()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rates])

  const handleAmountAChange = (amountA: string) => {
    setAmountB(format((+amountA * +rates[currencyA]) / +rates[currencyB]))
    setAmountA(amountA)
  }
  const handleAmountBChange = (amountB: string) => {
    setAmountA(format((+amountB * +rates[currencyB]) / +rates[currencyA]))
    setAmountB(amountB)
  }
  const handleCurrencyAChange = (currencyA: CurrencyList) => {
    setCurrencyA(currencyA)
    if (amountB) {
      setAmountA(format((+amountB * +rates[currencyB]) / +rates[currencyA]))
    }
  }
  const handleCurrencyBChange = (currencyB: CurrencyList) => {
    setCurrencyB(currencyB)
    if (amountA) {
      setAmountB(format((+amountA * +rates[currencyA]) / +rates[currencyB]))
    }
  }
  const handleOnClickSwap = () => {
    setIsChange(!isChange)
    setIsBuy(!isBuy)
  }

  const getCurrentRate = useMemo(() => {
    if (currencyA === CurrencyList.UAH && currencyB !== CurrencyList.UAH) {
      return `1 ${currencySymbols[currencyB]} = ${format(+rates[currencyB])} ${
        currencySymbols[currencyA]
      }`
    } else if (
      currencyA !== CurrencyList.UAH &&
      currencyB === CurrencyList.UAH
    ) {
      return `1 ${currencySymbols[currencyA]} = ${format(+rates[currencyA])} ${
        currencySymbols[currencyB]
      }`
    } else if (
      currencyA !== CurrencyList.UAH &&
      currencyB !== CurrencyList.UAH
    ) {
      return `1 ${currencySymbols[currencyA]} = ${format(
        +rates[currencyA] / +rates[currencyB]
      )} ${currencySymbols[currencyB]}`
    }
  }, [currencyA, currencyB, rates, currencySymbols])

  const getButtonName = useMemo(() => {
    let name = 'CHANGE CURRENCY'
    if (currencyA !== CurrencyList.UAH && currencyB === CurrencyList.UAH) {
      return (name = `SELL ${currencyA}`)
    } else if (
      currencyB !== CurrencyList.UAH &&
      currencyA === CurrencyList.UAH
    ) {
      return (name = `BUY ${currencyB}`)
    } else if (
      currencyA !== CurrencyList.UAH &&
      currencyB !== CurrencyList.UAH
    ) {
      return (name = `BUY ${currencyB}`)
    }
    return name
  }, [currencyA, currencyB])

  return (
    <div className={style.converter}>
      <div className={style.row}>
        <select
          className={style.select}
          name="currencyA"
          onChange={(e: React.BaseSyntheticEvent) =>
            handleCurrencyAChange(e.currentTarget.value)
          }
          value={currencyA}
        >
          {currencyList
            .filter((item) => item !== currencyB)
            .map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </select>
        <Input
          maxLength={20}
          type="number"
          autoComplete="off"
          placeholder="200.00"
          name="amountA"
          value={amountA}
          onChange={(e: React.BaseSyntheticEvent) =>
            handleAmountAChange(e.currentTarget.value)
          }
        />
      </div>
      <div className={style.row}>
        <Button onClick={handleOnClickSwap} className={style.transparent}>
          swap
          <svg
            className={style.icon}
            height="24px"
            width="24px"
            version="1.1"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
              <path d="M0 0h24v24H0z"></path>
              <path
                d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"
                fill="rgb(141, 198, 65)"
                fillRule="nonzero"
              ></path>
            </g>
          </svg>
        </Button>
        <div className={style.value}>{getCurrentRate}</div>
      </div>
      <div className={style.row}>
        <select
          className={style.select}
          name="currencyB"
          onChange={(e: React.BaseSyntheticEvent) =>
            handleCurrencyBChange(e.currentTarget.value)
          }
          value={currencyB}
        >
          {currencyList
            .filter((item) => item !== currencyA)
            .map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </select>
        <Input
          maxLength={20}
          type="number"
          autoComplete="off"
          placeholder="200.00"
          name="amountB"
          value={amountB}
          onChange={(e: React.BaseSyntheticEvent) =>
            handleAmountBChange(e.currentTarget.value)
          }
        />
      </div>
      <div className={style.row}>
        <Button>{getButtonName}</Button>
      </div>
    </div>
  )
}
