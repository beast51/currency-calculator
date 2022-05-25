import { FC, useEffect, useState } from 'react'
import { ConverterPropsType } from '../../types/types'
import { format } from '../../utils/common'
import { Button } from '../Button/Button'
import Input from '../Input/Input'
import s from './Converter.module.scss'

const UAH = 'UAH'
const USD = 'USD'
const EUR = 'EUR'
const currencyList = [UAH, USD, EUR]

export const Converter: FC<ConverterPropsType> = ({
  currencys,
  currencySymbols,
}) => {
  const [currencyA, setCurrencyA] = useState(USD)
  const [currencyB, setCurrencyB] = useState(UAH)

  const [amountA, setAmountA] = useState<number | ''>('')
  const [amountB, setAmountB] = useState<number | ''>('')

  const [isBuy, setIsBuy] = useState(true)
  const [isChange, setIsChange] = useState(false)

  const getRates = (isBuy: boolean) => {
    const rates: { [key: string]: string } = { UAH: '1' }
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
      if (!isBuy && currencyA !== UAH && currencyB !== UAH) {
        setAmountB(format((amountA * +rates[currencyB]) / +rates[currencyA]))
      } else if (isBuy && currencyA !== UAH && currencyB !== UAH) {
        setAmountB(format((amountA * +rates[currencyB]) / +rates[currencyA]))
      } else if (!isBuy) {
        setAmountA(format(amountA * +rates[currencyA]))
        setAmountB(amountA)
      } else {
        setAmountA(amountB)
        setAmountB(format(amountB * +rates[currencyB]))
      }
      setIsChange(!isChange)
    }
  }

  useEffect(() => {
    setRates(getRates(isBuy))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencys])

  useEffect(() => {
    setRates(getRates(isBuy))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBuy])

  useEffect(() => {
    swapLogic()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rates])

  const handleAmountAChange = (amountA: number) => {
    setAmountB(format((amountA * +rates[currencyA]) / +rates[currencyB]))
    setAmountA(amountA)
  }
  const handleAmountBChange = (amountB: number) => {
    setAmountA(format((amountB * +rates[currencyB]) / +rates[currencyA]))
    setAmountB(amountB)
  }
  const handleCurrencyAChange = (currencyA: string) => {
    setCurrencyA(currencyA)
    if (amountB) {
      setAmountA(format((amountB * +rates[currencyB]) / +rates[currencyA]))
    }
  }
  const handleCurrencyBChange = (currencyB: string) => {
    setCurrencyB(currencyB)
    if (amountA) {
      setAmountB(format((amountA * +rates[currencyA]) / +rates[currencyB]))
    }
  }
  const handleOnClickSwap = () => {
    setIsChange(!isChange)
    setIsBuy(!isBuy)
  }
  const getCurrentRate = () => {
    if (currencyA === UAH) {
      return `1 ${currencySymbols[currencyB]} = ${format(+rates[currencyB])} ${
        currencySymbols[currencyA]
      }`
    }
    if (currencyB === UAH) {
      return `1 ${currencySymbols[currencyA]} = ${format(+rates[currencyA])} ${
        currencySymbols[currencyB]
      }`
    }
    if (currencyA !== UAH && currencyB !== UAH) {
      return `1 ${currencySymbols[currencyA]} = ${format(
        +rates[currencyA] / +rates[currencyB]
      )} ${currencySymbols[currencyB]}`
    }
  }
  const getButtonName = () => {
    let name = 'CHANGE CURRENCY'
    if (currencyA !== UAH && currencyB === UAH) {
      return (name = `SELL ${currencyA}`)
    } else if (currencyB !== UAH && currencyA === UAH) {
      return (name = `BUY ${currencyB}`)
    } else if (currencyA !== UAH && currencyB !== UAH) {
      return (name = `BUY ${currencyB}`)
    }
    return name
  }

  return (
    <div className={s.converter}>
      <div className={s.converter__row}>
        <select
          className={s.select}
          name="currencyA"
          onChange={(e: any) => handleCurrencyAChange(e.currentTarget.value)}
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
          onChange={(e: any) => handleAmountAChange(e.currentTarget.value)}
        />
      </div>
      <div className={s.converter__row}>
        <Button onClick={handleOnClickSwap}>
          <svg
            className={s.converter__icon}
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
        <div
          className={s.converter__value}
          data-qa-node="rate"
          data-qa-value="1=33.7838"
        >
          {getCurrentRate()}
        </div>
      </div>
      <div className={s.converter__row}>
        <select
          className={s.select}
          name="currencyB"
          onChange={(e: any) => handleCurrencyBChange(e.currentTarget.value)}
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
          onChange={(e: any) => handleAmountBChange(e.currentTarget.value)}
        />
      </div>
      <div className={s.converter__row}>
        <Button>{getButtonName()}</Button>
      </div>
    </div>
  )
}
