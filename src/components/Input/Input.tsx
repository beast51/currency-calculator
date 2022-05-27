import React, { FC } from 'react'
import cn from 'classnames'
import style from './Input.module.scss'

type InputPropsType = {
  className?: string
  maxLength: number
  type: 'number'
  autoComplete: 'off'
  placeholder: string
  name: string
  value: number | string
  onChange: (e: React.SyntheticEvent) => void
}

export const Input: FC<InputPropsType> = ({ className, ...props }) => {
  return <input {...props} className={cn(style.input, className)} />
}
