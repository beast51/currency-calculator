import { FC } from 'react'
import s from './Button.module.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  onClick?: (e: React.SyntheticEvent) => void
}

export const Button: FC<Props> = ({
  children,
  className,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={[s.button, className].join(' ')}
    >
      {children}
    </button>
  )
}