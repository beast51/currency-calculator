import React, { FC } from 'react'
import { InputPropsType } from '../../types/types'
import s from './Input.module.scss'

const Input: FC<InputPropsType> = (props) => {
  return <input {...props} className={[s.input, props.className].join(' ')} />
}

export default Input
