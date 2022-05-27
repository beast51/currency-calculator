import style from './Spinner.module.scss'
import { FC } from 'react'
import cn from 'classnames'

type SpinnerPropsType = {
  className?: string
}

const Spinner: FC<SpinnerPropsType> = ({ className }) => {
  return <div className={cn(style.spinner, className)}>Loading...</div>
}

export default Spinner
