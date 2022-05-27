import { FC } from 'react'
import style from './Button.module.scss'
import cn from 'classnames'
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
      className={cn(style.button, className)}
    >
      {children}
    </button>
  )
}
