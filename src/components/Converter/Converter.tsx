import { FC, useContext, useEffect, useMemo, useState } from 'react'
import { Button } from 'components/Button/Button'
import { Input } from 'components/Input/Input'
import { StoreContext } from 'providers/CurrencysProvider'
import { ContextType } from 'types/types'
import { format } from 'utils/common'

import style from './Converter.module.scss'

const enum CurrencyList {
  UAH = 'UAH',
  USD = 'USD',
  EUR = 'EUR',
}

type StateType = {
  from: { currency: CurrencyList; amount: number | string }
  to: { currency: CurrencyList; amount: number | string }
}

const currencyList = [CurrencyList.UAH, CurrencyList.USD, CurrencyList.EUR]

export const Converter: FC = () => {
  const { currencys, currencySymbols } = useContext<ContextType>(StoreContext)

  const [state, setState] = useState<StateType>({
    from: { currency: CurrencyList.USD, amount: '' },
    to: { currency: CurrencyList.UAH, amount: '' },
  })

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
    if (isChange && state.from.amount && state.to.amount) {
      if (
        state.from.currency !== CurrencyList.UAH &&
        state.to.currency !== CurrencyList.UAH
      ) {
        setState({
          from: { ...state.from, currency: state.to.currency },
          to: {
            currency: state.from.currency,
            amount: format(
              (+state.from.amount * +rates[state.to.currency]) /
                +rates[state.from.currency]
            ),
          },
        })
      } else if (!isBuy) {
        setState({
          from: {
            currency: state.to.currency,
            amount: format(+state.from.amount * +rates[state.from.currency]),
          },
          to: {
            currency: state.from.currency,
            amount: format(+state.from.amount),
          },
        })
      } else {
        setState({
          from: {
            currency: state.to.currency,
            amount: format(+state.to.amount),
          },
          to: {
            currency: state.from.currency,
            amount: format(+state.to.amount * +rates[state.to.currency]),
          },
        })
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

  const handleChange = (
    element: 'amountA' | 'amountB' | 'currencyA' | 'currencyB',
    value: number | CurrencyList
  ) => {
    if (element === 'amountA') {
      setState({
        from: { ...state.from, amount: value },
        to: {
          ...state.to,
          amount: format(
            (+value * +rates[state.from.currency]) / +rates[state.to.currency]
          ),
        },
      })
    }
    if (element === 'amountB') {
      setState({
        from: {
          ...state.from,
          amount: format(
            (+value * +rates[state.to.currency]) / +rates[state.from.currency]
          ),
        },
        to: { ...state.to, amount: value },
      })
    }
    if (element === 'currencyA') {
      setState({
        from: {
          currency: value as CurrencyList,
          amount: format(
            (+state.to.amount * +rates[state.to.currency]) / +rates[value]
          ),
        },
        to: { ...state.to },
      })
    }
    if (element === 'currencyB') {
      setState({
        from: { ...state.from },
        to: {
          currency: value as CurrencyList,
          amount: format(
            (+state.to.amount * +rates[state.to.currency]) / +rates[value]
          ),
        },
      })
    }
  }

  const handleOnClickSwap = () => {
    setIsChange(!isChange)
    setIsBuy(!isBuy)
  }

  const getCurrentRate = useMemo(() => {
    if (
      state.from.currency === CurrencyList.UAH &&
      state.to.currency !== CurrencyList.UAH
    ) {
      return `1 ${currencySymbols[state.to.currency]} = ${format(
        +rates[state.to.currency]
      )} ${currencySymbols[state.from.currency]}`
    } else if (
      state.from.currency !== CurrencyList.UAH &&
      state.to.currency === CurrencyList.UAH
    ) {
      return `1 ${currencySymbols[state.from.currency]} = ${format(
        +rates[state.from.currency]
      )} ${currencySymbols[state.to.currency]}`
    } else if (
      state.from.currency !== CurrencyList.UAH &&
      state.to.currency !== CurrencyList.UAH
    ) {
      return `1 ${currencySymbols[state.from.currency]} = ${format(
        +rates[state.from.currency] / +rates[state.to.currency]
      )} ${currencySymbols[state.to.currency]}`
    }
  }, [state.from.currency, state.to.currency, rates, currencySymbols])

  const getButtonName = useMemo(() => {
    let name = 'CHANGE CURRENCY'
    if (
      state.from.currency !== CurrencyList.UAH &&
      state.to.currency === CurrencyList.UAH
    ) {
      return (name = `SELL ${state.from.currency}`)
    } else if (
      state.to.currency !== CurrencyList.UAH &&
      state.from.currency === CurrencyList.UAH
    ) {
      return (name = `BUY ${state.to.currency}`)
    } else if (
      state.from.currency !== CurrencyList.UAH &&
      state.to.currency !== CurrencyList.UAH
    ) {
      return (name = `BUY ${state.to.currency}`)
    }
    return name
  }, [state.from.currency, state.to.currency])

  return (
    <div className={style.converter}>
      <div className={style.row}>
        <select
          className={style.select}
          name="currencyA"
          onChange={(e: React.BaseSyntheticEvent) =>
            handleChange('currencyA', e.currentTarget.value)
          }
          value={state.from.currency}
        >
          {currencyList
            .filter((item) => item !== state.to.currency)
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
          value={state.from.amount}
          onChange={(e: React.BaseSyntheticEvent) =>
            handleChange('amountA', e.currentTarget.value)
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
            handleChange('currencyB', e.currentTarget.value)
          }
          value={state.to.currency}
        >
          {currencyList
            .filter((item) => item !== state.from.currency)
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
          value={state.to.amount}
          onChange={(e: React.BaseSyntheticEvent) =>
            handleChange('amountB', e.currentTarget.value)
          }
        />
      </div>
      <div className={style.row}>
        <Button>{getButtonName}</Button>
      </div>
    </div>
  )
}
