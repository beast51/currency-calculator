import React, { FC } from 'react'
import cn from 'classnames'
import style from './Input.module.scss'

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

const Input: FC<InputPropsType> = ({ className, ...props }) => {
  return <input {...props} className={cn(style.input, className)} />
}

export default Input
