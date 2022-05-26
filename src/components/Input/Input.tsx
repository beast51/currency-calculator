import React, { FC } from 'react'
import s from './Input.module.scss'

export type InputPropsType = {
  className?: string
  maxLength: number
  type: 'number'
  autoComplete: 'off'
  placeholder: string
  name: string
  value: number | string
  onChange: (e: React.SyntheticEvent) => void
}

const Input: FC<InputPropsType> = (props) => {
  return <input {...props} className={[s.input, props.className].join(' ')} />
}

export default Input
