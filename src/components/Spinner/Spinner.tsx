import s from './Spinner.module.scss'
import { FC } from 'react'
import { SpinnerPropsType } from '../../types/types'

const Spinner: FC<SpinnerPropsType> = ({ ...props }) => {
  return (
    <div className={[s.spinner, props.className].join(' ')}>Loading...</div>
  )
}

export default Spinner
