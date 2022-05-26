import style from './Spinner.module.scss'
import { FC } from 'react'

type SpinnerPropsType = {
  className?: string
}

const Spinner: FC<SpinnerPropsType> = (props) => {
  return (
    <div className={[style.spinner, props.className].join(' ')}>Loading...</div>
  )
}

export default Spinner
